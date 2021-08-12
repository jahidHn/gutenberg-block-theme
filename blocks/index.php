<?php
/**
 * Theme Support
 * https://wordpress.org/gutenberg/handbook/extensibility/theme-support
 */

add_action( 'init', function() {
	register_post_meta(
		'page',
		'_my_data',
		[
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'string',
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		]
	);
	
} );



function map_marketing_guten_support() {
	//add_theme_support( 'align-wide' );
}
add_action( 'after_setup_theme', 'map_marketing_guten_support' );


/**
 * Add custom block category to default categories
 * https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */

function wordpress_blocks_starter_block_categories( $categories, $post ) {
	/*
	if ( $post->post_type !== 'post' ) {
		return $categories;
	}
	*/
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'a-theme-blocks',
				'title' => __( 'Blocks Map', 'map-marketing' ),
			),
		)
	);
}
add_filter( 'block_categories', 'wordpress_blocks_starter_block_categories', 10, 2 );


/**
 * Enqueue block assets: Backend
 * 
 * https://github.com/WordPress/gutenberg/blob/master/docs/designers-developers/developers/tutorials/javascript/js-build-setup.md#dependency-management
 */

function wordpress_blocks_starter_enqueue_block_editor_assets() {
	$blocks_dir = 'blocks/build/';

	$blocks_asset_file = include get_theme_file_path( $blocks_dir . 'index.asset.php' );
	$blocks_asset_file['dependencies'] = array_replace( $blocks_asset_file['dependencies'],
		array_fill_keys(
			array_keys( $blocks_asset_file['dependencies'], 'wp-blockEditor' ),
			'wp-block-editor'
		)
	);

	wp_enqueue_script(
		'wordpress-blocks-starter-blocks',
		get_theme_file_uri( $blocks_dir . 'index.js', __FILE__ ),
		$blocks_asset_file['dependencies'],
		$blocks_asset_file['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'wordpress_blocks_starter_enqueue_block_editor_assets' );


