
// Your task is to implement scroll to section for buttons in the menu
// Clicking on it should scroll your page to particular section
// Section 1 using anchors as a solution, but your task is to make it without anchoring

const Component = () => {

	const sectionButtons = [
  	{
    	content: "Section 1",
      refId: "section1"
    },
    {
    	content: "Section 2",
      refId: "section2"
    },
    {
    	content: "Section 3",
      refId: "section3"
    },
    {
    	content: "Section 4",
      refId: "section4"
    },
  ]

	function scrollTo(sectionId) {
  	const selectedSection = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

	return (
  	<div className="container">
      <div className="menu">
        {
        	sectionButtons.map((btn) => {
          	return (
            	<button onClick={() => scrollTo(btn.refId)}>{btn.content}</button>
            )
          })
        }
      </div>
  	  <h1>Page Title</h1>
      <h2 id="section1">Section 1</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <h2 id="section2">Section 2</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <h2 id="section3">Section 3</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <h2 id="section4">Section 4</h2>
       <p>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
       </p>
  	</div>
  )
}

ReactDOM.render(<Component />, document.querySelector("#app"))
