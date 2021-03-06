/**
 * BLOCK: image
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import './style.scss';
// import './editor.scss';

( function( editor, components, i18n, element ) {
	var el = element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var RichText = wp.editor.RichText;
	var BlockControls = wp.editor.BlockControls;
	var AlignmentToolbar = wp.editor.AlignmentToolbar;
	var MediaUpload = wp.editor.MediaUpload;
	var InspectorControls = wp.editor.InspectorControls;
	var TextControl = wp.components.TextControl;
	var ColorPalette = wp.components.ColorPalette;

	const icon = el('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
		el('path', { d: "M 22 3 L 18.300781 4.101563 C 14.199219 5.300781 9.800781 5.300781 5.699219 4.101563 L 2 3 L 2 19 L 5.699219 17.898438 C 9.800781 16.699219 14.199219 16.699219 18.300781 17.898438 L 22 19 Z M 15.800781 14.199219 C 13.300781 13.601563 10.601563 13.601563 8.101563 14.199219 L 5 15 L 9 9.398438 L 11 11.898438 L 14 8 L 19 15 Z" } )
	);

	registerBlockType( 'absolutte-blocks/image', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Images Section' ), // The title of our block.
		description: i18n.__( 'Displays an image and text.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			subtitle: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			mediaID: {
				type: 'number',
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			idAttr: {
				type: 'string',
			},
		},

		edit: function( props ) {

			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					imageURL: media.url,
					mediaID: media.id,
				} );
			};

			return [
				el( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
					el( components.PanelBody, {
						title: i18n.__( 'ID Attribute' ),
						className: 'id-attribute',
						initialOpen: false,
					},
						el( TextControl, {
							type: 'string',
							label: i18n.__( 'ID Attribute' ),
							value: attributes.idAttr,
							onChange: function( newID ) {
								props.setAttributes( { idAttr: newID } );
							},
						} ),
					),
				),
				el( 'div', { className: props.className + ' absolutte-section-image absolutte-section', id: attributes.idAttr },
					el( 'div', { className: 'container' },
						el( 'div', { className: 'row align-items-center' },
							el( 'div', { className: 'col-md-6' },
								el( 'div', { className: 'absolutte-image-image absolutte-track' },
									el( MediaUpload, {
											onSelect: onSelectImage,
											type: 'image',
											value: attributes.mediaID,
											className: 'absolutte-service-icon',
											render: function( obj ) {
												return el( components.Button, {
														className: attributes.mediaID ? 'image-button' : 'button button-large',
														onClick: obj.open
													},
													! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL } )
												);
											}
										} 
									),
								),
							),
							el( 'div', { className: 'col-md-5 offset-md-1' },
								el( 'div', { className: 'absolutte-image-content absolutte-track' },
									el( RichText, {
											tagName: 'h3',
											className: 'absolutte-image-title absolutte-section-title',
											placeholder: i18n.__( 'Title' ),
											keepPlaceholderOnFocus: true,
											value: attributes.title,
											isSelected: false,
											style: { color: attributes.titleColor },
											onChange: function( newTitle ) {
												props.setAttributes( { title: newTitle } );
											},
										} 
									),
									el( 'div', { className: 'absolutte-image-text' },
										el( RichText, {
												tagName: 'p',
												placeholder: i18n.__( 'Sub title' ),
												keepPlaceholderOnFocus: true,
												value: attributes.subtitle,
												isSelected: false,
												onChange: function( newSubTitle ) {
													props.setAttributes( { subtitle: newSubTitle } );
												},
											} 
										),
									),
									
								),
							),
						),
					),
				),
				
			];
		},

		save: function( props ) {
			var attributes = props.attributes;

			return (
				<div className={ props.className + ' absolutte-section-image absolutte-section' } id={ attributes.idAttr }>

					<div className="container">
						<div className="row align-items-center">
							<div className="col-md-6">
								<div className="absolutte-image-image absolutte-track" data-animation="fadeIn">
									<img src={ attributes.imageURL } />
								</div>
							</div>

							<div className="col-md-5 offset-md-1">
								<div className="absolutte-image-content absolutte-track" data-animation="fadeInRight">
									<h3 className="absolutte-image-title absolutte-section-title">{ attributes.title }</h3>
									<div className="absolutte-image-text">
										<p>{ attributes.subtitle }</p>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			);
		},
	} );

} )(
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);