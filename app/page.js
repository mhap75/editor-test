"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";

export default function App() {
	const editorRef = useRef(null);
	const [content, setContent] = useState("");

	const log = () => {
		if (editorRef.current) {
			const htmlString = editorRef.current.getContent();
			// Parse the HTML string into a DOM structure
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlString, "text/html");

			// Access and manipulate DOM elements
			const images = doc.querySelectorAll("img");
			images.forEach((img) => {
				// Access individual image elements and their attributes
				console.log("Image source:", img.getAttribute("src"));
			});

			doc.querySelectorAll("*").forEach((element) => {
				console.log("Element Type:", element.tagName);
				// You can access and log more properties of each element as needed
				// For example, to log the inner text:
				console.log("Inner Text:", element.textContent);
			});

			// ... You can do the same for other elements as needed
		}
	};

	const parsedHtml = (htmlString) =>
		parse(htmlString, {
			replace: (node) => {
				if (node.name === "img") {
					// Replace image tags with the next/image component
					console.log(node.attribs);
					return (
						<Image
							src={node.attribs.src}
							alt={node.attribs.alt}
							width={node.attribs.width}
							height={500}
							className="h-auto"
						/>
					);
				}
				// Return other nodes as they are
				return node;
			},
		});

	return (
		<>
			<Editor
				id="something"
				apiKey="uyichdmx1u94espvw4kkc31zx7rynw085fferb8zzhvkv10u"
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={""}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						"a11ychecker",
						"advlist",
						"advcode",
						"advtable",
						"autolink",
						"checklist",
						"export",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"powerpaste",
						"fullscreen",
						"formatpainter",
						"insertdatetime",
						"media",
						"table",
						"help",
						"wordcount",
					],
					toolbar:
						"undo redo | casechange blocks | bold italic backcolor | " +
						"alignleft aligncenter alignright alignjustify | " +
						"bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				}}
				onEditorChange={(newText) => {
					setContent(newText);
					console.clear();
					console.log(newText);
				}}
			/>
			<button onClick={log}>Log editor content</button>
			{parsedHtml(content)}
		</>
	);
}
