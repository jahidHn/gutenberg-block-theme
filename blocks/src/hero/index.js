import { registerBlockType } from "@wordpress/blocks"
import { __ } from "@wordpress/i18n"
import {
  Button,
  TextControl,
  ColorPicker,
  Panel,
  PanelBody,
  PanelRow,
  ResponsiveWrapper,
  FontSizePicker,
  __experimentalBoxControl as BoxControl,
} from "@wordpress/components"

import {
  RichText,
  ColorPalette,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  BlockEditorProvider,
  BlockControls,
  AlignmentToolbar,
} from "@wordpress/block-editor"

registerBlockType("blocks/hero", {
  apiVersion: 2,
  category: "a-theme-blocks",
  title: "Map Hero",
  supports: {
    align: true,
  },
  attributes: {
    overlayColor: {
      type: "string",
      default: "#000",
    },
    fontSizeMeta: {
      type: "string",
      default: "1rem",
    },
    fontSizeHeading: {
      type: "string",
      default: "2.5rem",
    },
    fontSizeSocial: {
      type: "string",
      default: ".8rem",
    },
    headingMeta: {
      type: "string",
      default: "Duuzame huisjes",
    },
    heading: {
      type: "string",
      source: "html",
      selector: "h1",
      default:
        "Een ecologisch tiny huisje is zoveel mogelijk opgebouwd uit duurzame natuurlijke materialen", // empty default
    },
    mediaId: {
      type: "number",
      default: 0,
    },
    youtubeUrl: {
      type: "string",
      default: "https://youtube.com"
    },
    instagramUrl: {
      type: "string",
      default: "https://instagram.com",
      source: "attr",
      attr: "href",
      selector: ".socila__item"
    },
    linkedinUrl: {
      type: "string",
      default: "https://linkedine.com",
      source: "attr",
      attr: "href",
      selector: ".socila__item"
    },
    facebookUrl: {
      type: "string",
      default: "https://facebook.com",
      source: "attr",
      attr: "href",
      selector: ".socila__item"
    },
    

    // content: {
    //   source: "children",
    //   selector: ".social",
    //   default: "Instagram Facebook Linkedin",
    // },

    mediaUrl: {
      type: "url",
      default: "",
    },
    alignment: {
      type: "string",
      default: "left",
    },
    meta_heading_text_color: { type: "string", default: "#fff" },
    text_color: { type: "string", default: "#fff" },
    top: { type: "string", default: "15rem" },
    bottom: { type: "string", default: "15rem" },
    left: { type: "string", default: "0rem" },
    right: { type: "string", default: "0rem" },
  },

  edit: ({ attributes, setAttributes }) => {
   
    
    console.log(attributes.social)

    const onSelectMedia = (media) => {
      setAttributes({
        mediaId: media.id,
        mediaUrl: media.url,
      })
    }

    const onChangeBox = (e) => {
      setAttributes({
        top: e.top,
        left: e.left,
        right: e.right,
        bottom: e.bottom,
      })
    }

    const imgWrapStyle = {
      width: "100%",
      margin: "10px 10px 10px 0",
    }
    const blockStyle = {
      backgroundImage:
        attributes.mediaUrl != ""
          ? 'url("' + attributes.mediaUrl + '")'
          : "url('/wp-test/wp-content/themes/map-marketing/static/IMGhero-bg.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: `${
        attributes.top +
        " " +
        attributes.right +
        " " +
        attributes.bottom +
        " " +
        attributes.left
      }`,
      backgroundColor: `${attributes.overlayColor}`,
    }
    const colorMetaHeading = {
      color:
        attributes.meta_heading_text_color != ""
          ? attributes.meta_heading_text_color
          : "#fff",
          fontSize: attributes.fontSizeMeta
    }
    const colorHeading = {
      color: attributes.text_color != "" ? attributes.text_color : "#fff",
      fontSize: attributes.fontSizeHeading
    }

    return (
      <div className="map-editor">
        <InspectorControls key="inspector">
          <Panel>
            <PanelBody
              title={__("Background image", "map-marketing")}
              initialOpen={true}
            >
              <PanelRow>
                <div style={imgWrapStyle}>
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={onSelectMedia}
                      value={attributes.mediaId}
                      allowedTypes={["image"]}
                      render={({ open }) => (
                        <Button
                          className={
                            attributes.mediaId == 0
                              ? "editor-post-featured-image__toggle"
                              : "editor-post-featured-image__preview"
                          }
                          onClick={open}
                        >
                          {attributes.mediaId == 0 &&
                            __("Map Hero Images", "map-marketing")}
                          {attributes.mediaUrl != undefined && (
                            <ResponsiveWrapper
                              naturalWidth="100%"
                              naturalHeight="auto"
                            >
                              <img src={attributes.mediaUrl} />
                            </ResponsiveWrapper>
                          )}
                        </Button>
                      )}
                    />
                  </MediaUploadCheck>
                </div>
                <div style={imgWrapStyle}>
                  {attributes.mediaId != 0 && (
                    <MediaUploadCheck>
                      <MediaUpload
                        title={__("Replace image", "map-marketing")}
                        value={attributes.mediaId}
                        onSelect={onSelectMedia}
                        allowedTypes={["image"]}
                        render={({ open }) => (
                          <Button onClick={open} isDefault isLarge>
                            {__("Replace image", "map-marketing")}
                          </Button>
                        )}
                      />
                    </MediaUploadCheck>
                  )}
                </div>
              </PanelRow>
            </PanelBody>
            <PanelBody title={__("Map Socials", "map-marketing")}>
              <p>
                <strong>
                  <i>
                    {__(
                      "Keep Blank for not displaying on frontend",
                      "map-marketing"
                    )}
                  </i>
                </strong>
              </p>
              <div>
              <h4>{__("Video Link", "map-marketing")}</h4>
              <TextControl
                value={attributes.youtubeUrl}
                onChange={(val) => setAttributes({ youtubeUrl: val })}
              />
              <hr/>
              <h4>{__("Facebook Link", "map-marketing")}</h4>
              <TextControl
                value={attributes.facebookUrl}
                onChange={(val) => setAttributes({ facebookUrl: val })}
              />
              <hr/>
              <h4>{__("Instagram Link", "map-marketing")}</h4>
              <TextControl
                value={attributes.instagramUrl}
                onChange={(val) => setAttributes({ instagramUrl: val })}
              />
              <hr/>
              <h4>{__("LinkedIn Link", "map-marketing")}</h4>
              <TextControl
                value={attributes.linkedinUrl}
                onChange={(val) => setAttributes({ linkedinUrl: val })}
              />
              </div>
              
            </PanelBody>
            <PanelBody title={__("Map Typo & Styles", "map-marketing")}>
              <h4>{__("Meta Heading Font Size")}</h4>
              <FontSizePicker
                fontSizes={[
                  {
                    name: __("Small"),
                    slug: "small",
                    size: 12,
                  },
                  {
                    name: __("Big"),
                    slug: "big",
                    size: 26,
                  },
                ]}
                value={attributes.fontSizeMeta}
                onChange={(val) => setAttributes({ fontSizeMeta: val })}
                withSlider
              />
              <hr/>
              <h4>{__("Heading Font Size")}</h4>
              <FontSizePicker
                fontSizes={[
                  {
                    name: __("Small"),
                    slug: "small",
                    size: 1.5,
                  },
                  {
                    name: __("Big"),
                    slug: "big",
                    size: 2,
                  },
                ]}
                value={attributes.fontSizeHeading}
                onChange={(val) => setAttributes({ fontSizeHeading: val })}
                withSlider
              />
              <hr/>
              <h4>{__("Social Font Size")}</h4>
              <FontSizePicker
                fontSizes={[
                  {
                    name: __("Small"),
                    slug: "small",
                    size: 10,
                  },
                  {
                    name: __("Big"),
                    slug: "big",
                    size: 14,
                  },
                ]}
                value={attributes.fontSizeSocial}
                onChange={(val) => setAttributes({ fontSizeSocial: val })}
                withSlider
              />
              <hr/>
              <h3> {__("Box Background Color", "map-marketing")} </h3>
              <ColorPicker
                color={`${attributes.overlayColor}`}
                onChangeComplete={(val) =>
                  setAttributes({ overlayColor: val.hex })
                }
                disableAlpha
              />
              <hr/>
              <h4> {__("Meta Heading Color", "map-marketing")} </h4>
              <ColorPicker
                color={`${attributes.meta_heading_text_color}`}
                onChangeComplete={(val) =>
                  setAttributes({ meta_heading_text_color: val.hex })
                }
                disableAlpha
              />
              <hr/>
              
              <h4> {__("Heading Color", "map-marketing")} </h4>
              <ColorPicker
                color={`${attributes.text_color}`}
                onChangeComplete={(val) =>
                  setAttributes({ text_color: val.hex })
                }
                disableAlpha
              />

         
              <hr />
              <h4> {__("Hero Space", "map-marketing")} </h4>
              <BoxControl
                values={{
                  top: attributes.top,
                  left: attributes.left,
                  right: attributes.right,
                  bottom: attributes.bottom,
                }}
                onChange={onChangeBox}
              />
            </PanelBody>
          </Panel>
        </InspectorControls>
        <BlockEditorProvider>
          <BlockControls key="controls">
            <AlignmentToolbar
              value={attributes.alignment}
              onChange={(alignment) => setAttributes({ alignment })}
            />
          </BlockControls>
        </BlockEditorProvider>

        <div style={blockStyle} className="map-hero map-display">
        {/* <RichText
              value={attributes.content}
              onChange={(val) => setAttributes({ content: val })}
              allowedFormats={["core/link"]}
              multiline="true"
              inlineToolbar="true"
              className="social"
              style={{fontSize: attributes.fontSizeSocial}}
            /> */}
          <div className="container-sm">
            
            <div className="row">
              <div className="col-sm-6">
                <RichText
                  value={attributes.headingMeta}
                  tagName="p"
                  onChange={(val) => setAttributes({ headingMeta: val })}
                  style={colorMetaHeading}
                />
                <RichText
                  value={attributes.heading}
                  tagName="h1"
                  onChange={(val) => setAttributes({ heading: val })}
                  style={colorHeading}
                />
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  save: ({ attributes }) => {
    const blockStyle = {
      backgroundImage:
        attributes.mediaUrl != ""
          ? 'url("' + attributes.mediaUrl + '")'
          : "url('/wp-test/wp-content/themes/map-marketing/static/IMGhero-bg.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: `${
        attributes.top +
        " " +
        attributes.right +
        " " +
        attributes.bottom +
        " " +
        attributes.left
      }`,
      backgroundColor: `${attributes.overlayColor}`,
    }
    const colorMetaHeading = {
      color:
        attributes.meta_heading_text_color != ""
          ? attributes.meta_heading_text_color
          : "#fff",
      fontSize: attributes.fontSizeHeading
    }
    const colorHeading = {
      color: attributes.text_color != "" ? attributes.text_color : "#fff",
      fontSize: attributes.fontSizeHeading
    }

    return (
      <div style={blockStyle} className="map-editor-display map-display">
        <div className="social" style={{fontSize: attributes.fontSizeSocial}}>
          {attributes.instagramUrl != "" && (
            
            <a
            href={attributes.instagramUrl}
            className="socila__item"
            traget="_blank"
          >{__("Instagram", "map-marketing")}</a>
          )}
          {attributes.facebookUrl != "" && (
             <a
             href={attributes.facebookUrl}
             className="socila__item"
             traget="_blank"
           >{__("Facebook", "map-marketing")}</a>
          )}
          {attributes.linkedinUrl != "" && (
             <a
             href={attributes.linkedinUrl}
             className="socila__item"
             traget="_blank"
           >{__("Linkedin", "map-marketing")}</a>
          )}

        </div>
        <div className="container-sm">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <RichText.Content
                style={colorMetaHeading}
                value={attributes.headingMeta}
                tagName="p"
              />
              <RichText.Content
                style={colorHeading}
                value={attributes.heading}
                tagName="h1"
              />
            </div>
            <div className="col-sm-6 text-center">
              {attributes.youtubeUrl != "" && (
                <RichText.Content
                  href={attributes.youtubeUrl}
                  tagName="a"
                  value='<span className="svg-wrap">
                <svg width="131" height="32" viewBox="0 0 131 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 32C25.8366 32 33 24.8366 33 16C33 7.16344 25.8366 0 17 0C8.16344 0 1 7.16344 1 16C1 24.8366 8.16344 32 17 32Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 16.5L15 20V13L20 16.5Z" fill="#222F33" stroke="#222F33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M43.224 19C43.144 19 43.076 18.972 43.02 18.916C42.964 18.86 42.936 18.792 42.936 18.712V10.9C42.936 10.812 42.96 10.74 43.008 10.684C43.064 10.628 43.136 10.6 43.224 10.6H46.704C47.64 10.6 48.336 10.808 48.792 11.224C49.256 11.632 49.488 12.192 49.488 12.904C49.488 13.32 49.384 13.676 49.176 13.972C48.976 14.26 48.74 14.468 48.468 14.596C48.804 14.748 49.084 14.996 49.308 15.34C49.54 15.684 49.656 16.076 49.656 16.516C49.656 17.26 49.404 17.86 48.9 18.316C48.404 18.772 47.704 19 46.8 19H43.224ZM46.488 14.044C46.904 14.044 47.22 13.944 47.436 13.744C47.652 13.544 47.76 13.276 47.76 12.94C47.76 12.596 47.652 12.332 47.436 12.148C47.22 11.956 46.904 11.86 46.488 11.86H44.604V14.044H46.488ZM46.608 17.728C47.024 17.728 47.348 17.616 47.58 17.392C47.812 17.16 47.928 16.868 47.928 16.516C47.928 16.156 47.812 15.864 47.58 15.64C47.348 15.408 47.024 15.292 46.608 15.292H44.604V17.728H46.608ZM53.7066 19.12C52.8186 19.12 52.1106 18.864 51.5826 18.352C51.0626 17.832 50.7866 17.104 50.7546 16.168L50.7426 15.868L50.7546 15.568C50.7946 14.656 51.0746 13.94 51.5946 13.42C52.1226 12.9 52.8266 12.64 53.7066 12.64C54.6506 12.64 55.3786 12.928 55.8906 13.504C56.4106 14.08 56.6706 14.848 56.6706 15.808V16.06C56.6706 16.14 56.6426 16.208 56.5866 16.264C56.5306 16.32 56.4586 16.348 56.3706 16.348H52.3866V16.444C52.4026 16.884 52.5226 17.256 52.7466 17.56C52.9786 17.856 53.2946 18.004 53.6946 18.004C54.1666 18.004 54.5466 17.82 54.8346 17.452C54.9066 17.364 54.9626 17.308 55.0026 17.284C55.0506 17.26 55.1186 17.248 55.2066 17.248H56.2386C56.3106 17.248 56.3706 17.272 56.4186 17.32C56.4746 17.36 56.5026 17.412 56.5026 17.476C56.5026 17.668 56.3866 17.896 56.1546 18.16C55.9306 18.416 55.6066 18.64 55.1826 18.832C54.7586 19.024 54.2666 19.12 53.7066 19.12ZM55.0386 15.34V15.304C55.0386 14.832 54.9186 14.452 54.6786 14.164C54.4466 13.876 54.1226 13.732 53.7066 13.732C53.2906 13.732 52.9666 13.876 52.7346 14.164C52.5026 14.452 52.3866 14.832 52.3866 15.304V15.34H55.0386ZM58.2443 19C58.1643 19 58.0963 18.972 58.0403 18.916C57.9843 18.86 57.9563 18.792 57.9563 18.712V10.768C57.9563 10.68 57.9843 10.612 58.0403 10.564C58.0963 10.508 58.1643 10.48 58.2443 10.48H59.2163C59.3043 10.48 59.3723 10.508 59.4203 10.564C59.4763 10.612 59.5043 10.68 59.5043 10.768V14.872L61.5203 12.964C61.5443 12.948 61.5843 12.916 61.6403 12.868C61.6883 12.828 61.7363 12.8 61.7843 12.784C61.8323 12.768 61.8923 12.76 61.9643 12.76H63.0803C63.1603 12.76 63.2243 12.784 63.2723 12.832C63.3203 12.88 63.3443 12.944 63.3443 13.024C63.3443 13.096 63.3043 13.168 63.2243 13.24L60.7523 15.556L63.5243 18.532C63.6043 18.612 63.6443 18.68 63.6443 18.736C63.6443 18.816 63.6163 18.88 63.5603 18.928C63.5123 18.976 63.4523 19 63.3803 19H62.2403C62.1283 19 62.0443 18.988 61.9883 18.964C61.9403 18.932 61.8763 18.876 61.7963 18.796L59.5043 16.384V18.712C59.5043 18.792 59.4763 18.86 59.4203 18.916C59.3723 18.972 59.3043 19 59.2163 19H58.2443ZM64.782 11.728C64.702 11.728 64.634 11.7 64.578 11.644C64.522 11.588 64.494 11.52 64.494 11.44V10.576C64.494 10.496 64.522 10.428 64.578 10.372C64.634 10.316 64.702 10.288 64.782 10.288H65.874C65.954 10.288 66.022 10.316 66.078 10.372C66.142 10.428 66.174 10.496 66.174 10.576V11.44C66.174 11.52 66.146 11.588 66.09 11.644C66.034 11.7 65.962 11.728 65.874 11.728H64.782ZM64.83 19C64.75 19 64.682 18.972 64.626 18.916C64.57 18.86 64.542 18.792 64.542 18.712V13.048C64.542 12.968 64.57 12.9 64.626 12.844C64.682 12.788 64.75 12.76 64.83 12.76H65.826C65.914 12.76 65.982 12.788 66.03 12.844C66.086 12.892 66.114 12.96 66.114 13.048V18.712C66.114 18.792 66.086 18.86 66.03 18.916C65.982 18.972 65.914 19 65.826 19H64.83ZM68.0781 11.728C67.9981 11.728 67.9301 11.7 67.8741 11.644C67.8181 11.588 67.7901 11.52 67.7901 11.44V10.576C67.7901 10.496 67.8181 10.428 67.8741 10.372C67.9301 10.316 67.9981 10.288 68.0781 10.288H69.2061C69.2861 10.288 69.3541 10.316 69.4101 10.372C69.4741 10.428 69.5061 10.496 69.5061 10.576V11.44C69.5061 11.52 69.4781 11.588 69.4221 11.644C69.3661 11.7 69.2941 11.728 69.2061 11.728H68.0781ZM66.6741 21.28C66.5861 21.28 66.5181 21.252 66.4701 21.196C66.4141 21.148 66.3861 21.08 66.3861 20.992V20.308C66.3861 20.22 66.4141 20.148 66.4701 20.092C66.5261 20.036 66.5941 20.008 66.6741 20.008H66.9861C67.3221 20.008 67.5461 19.92 67.6581 19.744C67.7781 19.576 67.8381 19.324 67.8381 18.988V13.048C67.8381 12.96 67.8661 12.892 67.9221 12.844C67.9781 12.788 68.0461 12.76 68.1261 12.76H69.1701C69.2501 12.76 69.3181 12.788 69.3741 12.844C69.4301 12.9 69.4581 12.968 69.4581 13.048V19.012C69.4581 19.732 69.2621 20.288 68.8701 20.68C68.4861 21.08 67.9061 21.28 67.1301 21.28H66.6741ZM71.3576 19C71.2776 19 71.2096 18.972 71.1536 18.916C71.0976 18.86 71.0696 18.792 71.0696 18.712V10.768C71.0696 10.68 71.0976 10.612 71.1536 10.564C71.2096 10.508 71.2776 10.48 71.3576 10.48H72.3296C72.4176 10.48 72.4856 10.508 72.5336 10.564C72.5896 10.612 72.6176 10.68 72.6176 10.768V14.872L74.6336 12.964C74.6576 12.948 74.6976 12.916 74.7536 12.868C74.8016 12.828 74.8496 12.8 74.8976 12.784C74.9456 12.768 75.0056 12.76 75.0776 12.76H76.1936C76.2736 12.76 76.3376 12.784 76.3856 12.832C76.4336 12.88 76.4576 12.944 76.4576 13.024C76.4576 13.096 76.4176 13.168 76.3376 13.24L73.8656 15.556L76.6376 18.532C76.7176 18.612 76.7576 18.68 76.7576 18.736C76.7576 18.816 76.7296 18.88 76.6736 18.928C76.6256 18.976 76.5656 19 76.4936 19H75.3536C75.2416 19 75.1576 18.988 75.1016 18.964C75.0536 18.932 74.9896 18.876 74.9096 18.796L72.6176 16.384V18.712C72.6176 18.792 72.5896 18.86 72.5336 18.916C72.4856 18.972 72.4176 19 72.3296 19H71.3576ZM82.6314 19.12C81.8234 19.12 81.2034 18.86 80.7714 18.34C80.3394 17.82 80.1074 17.128 80.0754 16.264L80.0634 15.868L80.0754 15.484C80.0994 14.644 80.3274 13.96 80.7594 13.432C81.1994 12.904 81.8234 12.64 82.6314 12.64C83.4074 12.64 84.0234 12.904 84.4794 13.432V10.768C84.4794 10.68 84.5074 10.612 84.5634 10.564C84.6194 10.508 84.6874 10.48 84.7674 10.48H85.7874C85.8754 10.48 85.9434 10.508 85.9914 10.564C86.0474 10.612 86.0754 10.68 86.0754 10.768V18.712C86.0754 18.792 86.0474 18.86 85.9914 18.916C85.9434 18.972 85.8754 19 85.7874 19H84.8394C84.7594 19 84.6914 18.972 84.6354 18.916C84.5794 18.86 84.5514 18.792 84.5514 18.712V18.268C84.0954 18.836 83.4554 19.12 82.6314 19.12ZM83.0754 17.836C83.5394 17.836 83.8834 17.688 84.1074 17.392C84.3314 17.096 84.4554 16.732 84.4794 16.3C84.4874 16.204 84.4914 16.048 84.4914 15.832C84.4914 15.624 84.4874 15.472 84.4794 15.376C84.4634 14.976 84.3354 14.636 84.0954 14.356C83.8634 14.068 83.5234 13.924 83.0754 13.924C82.2114 13.924 81.7514 14.456 81.6954 15.52L81.6834 15.88L81.6954 16.24C81.7514 17.304 82.2114 17.836 83.0754 17.836ZM90.3628 19.12C89.4748 19.12 88.7668 18.864 88.2388 18.352C87.7188 17.832 87.4428 17.104 87.4108 16.168L87.3988 15.868L87.4108 15.568C87.4508 14.656 87.7308 13.94 88.2508 13.42C88.7788 12.9 89.4828 12.64 90.3628 12.64C91.3068 12.64 92.0348 12.928 92.5468 13.504C93.0668 14.08 93.3268 14.848 93.3268 15.808V16.06C93.3268 16.14 93.2988 16.208 93.2428 16.264C93.1868 16.32 93.1148 16.348 93.0268 16.348H89.0428V16.444C89.0588 16.884 89.1788 17.256 89.4028 17.56C89.6348 17.856 89.9508 18.004 90.3508 18.004C90.8228 18.004 91.2028 17.82 91.4908 17.452C91.5628 17.364 91.6188 17.308 91.6588 17.284C91.7068 17.26 91.7748 17.248 91.8628 17.248H92.8948C92.9668 17.248 93.0268 17.272 93.0748 17.32C93.1308 17.36 93.1588 17.412 93.1588 17.476C93.1588 17.668 93.0428 17.896 92.8108 18.16C92.5868 18.416 92.2628 18.64 91.8388 18.832C91.4148 19.024 90.9228 19.12 90.3628 19.12ZM91.6948 15.34V15.304C91.6948 14.832 91.5748 14.452 91.3348 14.164C91.1028 13.876 90.7788 13.732 90.3628 13.732C89.9468 13.732 89.6228 13.876 89.3908 14.164C89.1588 14.452 89.0428 14.832 89.0428 15.304V15.34H91.6948ZM98.0918 19C98.0118 19 97.9438 18.972 97.8878 18.916C97.8318 18.86 97.8038 18.792 97.8038 18.712V14.032H96.8318C96.7518 14.032 96.6838 14.004 96.6278 13.948C96.5718 13.884 96.5438 13.812 96.5438 13.732V13.048C96.5438 12.968 96.5718 12.9 96.6278 12.844C96.6838 12.788 96.7518 12.76 96.8318 12.76H97.8038V12.268C97.8038 10.836 98.5878 10.12 100.156 10.12H100.972C101.06 10.12 101.128 10.148 101.176 10.204C101.232 10.252 101.26 10.32 101.26 10.408V11.092C101.26 11.18 101.232 11.252 101.176 11.308C101.12 11.364 101.052 11.392 100.972 11.392H100.204C99.8918 11.392 99.6718 11.468 99.5438 11.62C99.4238 11.772 99.3638 12.008 99.3638 12.328V12.76H100.852C100.94 12.76 101.008 12.788 101.056 12.844C101.112 12.892 101.14 12.96 101.14 13.048V13.732C101.14 13.82 101.112 13.892 101.056 13.948C101 14.004 100.932 14.032 100.852 14.032H99.3638V18.712C99.3638 18.792 99.3358 18.86 99.2798 18.916C99.2238 18.972 99.1558 19 99.0758 19H98.0918ZM102.341 11.728C102.261 11.728 102.193 11.7 102.137 11.644C102.081 11.588 102.053 11.52 102.053 11.44V10.576C102.053 10.496 102.081 10.428 102.137 10.372C102.193 10.316 102.261 10.288 102.341 10.288H103.433C103.513 10.288 103.581 10.316 103.637 10.372C103.701 10.428 103.733 10.496 103.733 10.576V11.44C103.733 11.52 103.705 11.588 103.649 11.644C103.593 11.7 103.521 11.728 103.433 11.728H102.341ZM102.389 19C102.309 19 102.241 18.972 102.185 18.916C102.129 18.86 102.101 18.792 102.101 18.712V13.048C102.101 12.968 102.129 12.9 102.185 12.844C102.241 12.788 102.309 12.76 102.389 12.76H103.385C103.473 12.76 103.541 12.788 103.589 12.844C103.645 12.892 103.673 12.96 103.673 13.048V18.712C103.673 18.792 103.645 18.86 103.589 18.916C103.541 18.972 103.473 19 103.385 19H102.389ZM105.565 19C105.485 19 105.417 18.972 105.361 18.916C105.305 18.86 105.277 18.792 105.277 18.712V10.768C105.277 10.68 105.305 10.612 105.361 10.564C105.417 10.508 105.485 10.48 105.565 10.48H106.561C106.649 10.48 106.717 10.508 106.765 10.564C106.821 10.612 106.849 10.68 106.849 10.768V18.712C106.849 18.792 106.821 18.86 106.765 18.916C106.717 18.972 106.649 19 106.561 19H105.565ZM108.728 19C108.648 19 108.58 18.972 108.524 18.916C108.468 18.86 108.44 18.792 108.44 18.712V13.048C108.44 12.968 108.468 12.9 108.524 12.844C108.58 12.788 108.648 12.76 108.728 12.76H109.664C109.744 12.76 109.812 12.788 109.868 12.844C109.924 12.9 109.952 12.968 109.952 13.048V13.456C110.368 12.912 110.948 12.64 111.692 12.64C112.58 12.64 113.2 12.996 113.552 13.708C113.744 13.388 114.016 13.132 114.368 12.94C114.72 12.74 115.1 12.64 115.508 12.64C116.164 12.64 116.7 12.864 117.116 13.312C117.532 13.76 117.74 14.412 117.74 15.268V18.712C117.74 18.792 117.712 18.86 117.656 18.916C117.608 18.972 117.54 19 117.452 19H116.468C116.388 19 116.32 18.972 116.264 18.916C116.208 18.86 116.18 18.792 116.18 18.712V15.364C116.18 14.86 116.072 14.496 115.856 14.272C115.648 14.04 115.368 13.924 115.016 13.924C114.704 13.924 114.436 14.04 114.212 14.272C113.996 14.504 113.888 14.868 113.888 15.364V18.712C113.888 18.792 113.86 18.86 113.804 18.916C113.748 18.972 113.68 19 113.6 19H112.616C112.536 19 112.468 18.972 112.412 18.916C112.356 18.86 112.328 18.792 112.328 18.712V15.364C112.328 14.86 112.216 14.496 111.992 14.272C111.776 14.04 111.5 13.924 111.164 13.924C110.844 13.924 110.572 14.04 110.348 14.272C110.132 14.504 110.024 14.868 110.024 15.364V18.712C110.024 18.792 109.996 18.86 109.94 18.916C109.884 18.972 109.816 19 109.736 19H108.728Z" fill="white"/>
</svg>       
             </span>'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
