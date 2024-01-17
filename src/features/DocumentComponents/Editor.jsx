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
import InlineCode from '@editorjs/inline-code';
import AttachesTool from '@editorjs/attaches';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';

const EditorComponent = ({ isOpen }) => {
  const ejInstance = useRef();

  useEffect(() => {
    if (!ejInstance.current) {
      ejInstance.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header, // Add other tools as needed
          code: CodeTool,
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
            shortcut: 'CMD+SHIFT+M',
          },
          attaches: {
            class: AttachesTool,
            config: {
              endpoint: 'http://localhost:8008/uploadFile'
            }
          },
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          delimiter: Delimiter
        },
        autofocus: true,
        data: {
          blocks: [
            {
              type: "header",
              data: {
                text: "Your initial header",
                level: 1,
              },
            },
            // Add other initial blocks if needed
          ],
        },
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

  return <div style={{textAlign: "left"}} id="editorjs"></div>;
};

export default EditorComponent;
