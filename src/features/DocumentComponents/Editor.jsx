import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header"; // If using the Header tool
import CodeTool from "@editorjs/code";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import InlineCode from "@editorjs/inline-code";
import AttachesTool from "@editorjs/attaches";
import Delimiter from "@editorjs/delimiter";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Paragraph from "@editorjs/paragraph";
import Underline from "@editorjs/underline";
import Tooltip from "editorjs-tooltip";
import ChangeCase from "editorjs-change-case";
import ColorPlugin from "editorjs-text-color-plugin";

const EditorComponent = ({ isOpen, initialData, customStyles }) => {
  const ejInstance = useRef();

  useEffect(() => {
    if (!ejInstance.current) {
      ejInstance.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header, // Add other tools as needed
          code: CodeTool,
          list: {
            class: List,
            inlineToolbar: true,
          },
          warning: Warning,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          link: LinkTool,
          raw: RawTool,
          image: SimpleImage,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          embed: Embed,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          table: Table,
          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+M",
          },
          attaches: {
            class: AttachesTool,
            config: {
              endpoint: "http://localhost:8008/uploadFile",
            },
          },
          delimiter: Delimiter,
          underline: Underline,
          changeCase: {
            class: ChangeCase,
            config: {
              showLocaleOption: true, // enable locale case options
              locale: "tr", // or ['tr', 'TR', 'tr-TR']
            },
          },
          tooltip: {
            class: Tooltip,
            config: {
              location: "left",
              highlightColor: "#FFEFD5",
              underline: true,
              backgroundColor: "#154360",
              textColor: "#FDFEFE",
              holder: "editorId",
            },
          },
          Color: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              colorCollections: [
                "#EC7878",
                "#9C27B0",
                "#673AB7",
                "#3F51B5",
                "#0070FF",
                "#03A9F4",
                "#00BCD4",
                "#4CAF50",
                "#8BC34A",
                "#CDDC39",
                "#FFF",
              ],
              defaultColor: "#FF1300",
              type: "text",
              customPicker: true, // add a button to allow selecting any colour
            },
          },
          Marker: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              defaultColor: "#FFBF00",
              type: "marker",
              icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
            },
          },
        },
        autofocus: true,
        data: initialData ? Object.keys(initialData).length > 0 ? initialData : {} : {}
        // Define other options and event handlers as needed
      });
    }

    // Cleanup function
    return () => {
      if (!isOpen) {
        if (
          ejInstance.current &&
          typeof ejInstance.current.destroy === "function"
        ) {
          ejInstance.current.destroy();
          ejInstance.current = null;
        }
      }
    };
  }, [isOpen]); // Dependency array includes isOpen

  return (
    <>
      <div
        style={{ textAlign: "left", alignItems: "start", ...customStyles }}
        id="editorjs"
      >
      </div>
    </>
  );
};

export default EditorComponent;
