<?php
/**
 * Template Name: Default
 */

get_header();

the_post();
?>
<div id="post-<?php the_ID(); ?>" <?php post_class( 'content' ); ?>>
	<?php
		the_content();

		wp_link_pages( array(
			'before' => '<div class="page-links">' . __( 'Pages:', 'map-marketing' ),
			'after'  => '</div>',
		) );
		edit_post_link( __( 'Edit', 'map-marketing' ), '<span class="edit-link">', '</span>' );
	?>
</div><!-- /#post-<?php the_ID(); ?> -->
<?php
	// If comments are open or we have at least one comment, load up the comment template
	if ( comments_open() || get_comments_number() ) :
		comments_template();
	endif;

get_footer();
