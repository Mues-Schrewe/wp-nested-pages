<?php namespace NestedPages\Entities\NavMenu;

use NestedPages\Entities\NavMenu\NavMenuSync;
use NestedPages\Helpers;
use NestedPages\Entities\Post\PostUpdateRepository;
use NestedPages\Entities\Post\PostRepository;
use NestedPages\Entities\NavMenu\NavMenuRepository;

/**
* Syncs the Listing to Match the Menu
*/
class NavMenuSyncMenu extends NavMenuSync implements NavMenuSyncInterface {

	/**
	* Menu Items
	* @var array of objects
	*/
	private $menu_items;

	/**
	* Menu Index
	* @var array
	*/
	private $menu_index;

	/**
	* Post Update Repository
	* @var object
	*/
	private $post_update_repo;

	/**
	* Post Repository
	* @var object
	*/
	private $post_repo;


	public function __construct()
	{
		parent::__construct();
		$this->post_update_repo = new PostUpdateRepository;
		$this->post_repo = new PostRepository;
		$this->setMenuItems();
		$this->sync();
		return true;
	}


	/**
	* Get the menu items from menu and set them
	*/
	private function setMenuItems()
	{
		$this->menu_items = wp_get_nav_menu_items($this->id);
	}


	/**
	* Loop through the menu items and sync depending on type
	*/
	public function sync()
	{	
		if ( get_option('nestedpages_menusync') !== 'sync' ) return;
		$this->setMenuIndex();
		foreach($this->menu_items as $key => $item){
			//var_dump($item);
			$this->updatePost($item);
		}
	}

	/**
	* Set Menu Order/Parent Index
	*/
	private function setMenuIndex()
	{
		foreach($this->menu_items as $key => $item){
			$this->index[$item->ID] = array(
				'ID' => $item->object_id,
				'title' => $item->title
			);
		}
	}


	/**
	* Update the WP Post with Menu Data
	*/
	private function updatePost($item)
	{
		$parent_id = ( $item->menu_item_parent == '0' ) ? 0 : $this->index[$item->menu_item_parent]['ID'];
		
		if ( $this->nav_menu_repo->isNavMenuItem($parent_id) ) {
			$parent_id = $this->nav_menu_repo->getLinkfromTitle($this->index[$item->menu_item_parent]['title']);
		}

		$post_id = ( $item->object == 'page' ) 
			? $item->object_id
			: $item->xfn;
		
		$post_data = array(
			'menu_order' => $item->menu_order,
			'post_id' => $post_id,
			'link_target' => $item->target,
			'np_nav_title' => $item->title,
			'np_title_attribute' => $item->attr_title,
			'post_parent' => $parent_id,
			'np_nav_css_classes' => $item->classes
		);
		if ( $item->type == 'custom' ) {
			$post_data['content'] = $item->url;
			$post_data['post_id'] = $item->xfn;
		}
		
		if ( is_string(get_post_status($post_id)) ){
			$this->post_update_repo->updateFromMenuItem($post_data);
		} else {
			$this->syncNewLink($item, $parent_id);
		}
	}


	/**
	* Sync a new Link
	*/
	private function syncNewLink($item, $parent_id)
	{
		$post_data = array(
			'np_link_title' => $item->title,
			'_status' => 'publish',
			'np_link_content' => $item->url,
			'parent_id' => $parent_id,
			'post_type' => 'np-redirect',
			'link_target' => $item->target,
			'menu_order'=> $item->menu_order
		);
		$this->post_update_repo->saveRedirect($post_data);
	}

}
