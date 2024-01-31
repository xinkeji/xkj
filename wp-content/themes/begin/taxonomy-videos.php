<?php 
if ( ! defined( 'ABSPATH' ) ) exit;
get_header(); ?>

<section id="picture" class="picture-area content-area site-img grid-cat-<?php echo be_get_option( 'img_f' ); ?>">
	<main id="main" class="be-main site-main" role="main">
		<?php if (zm_get_option('type_cat')) { ?><?php if ( !is_paged() ) : get_template_part( 'template/type-cat' ); endif; ?><?php } ?>
		<?php while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" class="post-item-list post scl">
			<div class="picture-box sup" <?php aos_a(); ?>>
				<figure class="picture-img">
					<?php echo videos_thumbnail(); ?>
					<?php echo be_vip_meta(); ?>
					<a rel="external nofollow" href="<?php echo esc_url( get_permalink() ); ?>"><i class="be be-play"></i></a>
				</figure>
				<?php the_title( sprintf( '<h3 class="picture-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h3>' ); ?>
			</div>
		</article>
		<?php endwhile; ?>
	</main>
	<div class="other-nav"><?php begin_pagenav(); ?></div>
	<div class="clear"></div>
</section>

<?php get_footer(); ?>