function mapToDbFormat(input) {
  // Extracting necessary parts from the input
  const { document_data, document_client } = input;
  console.log("document data", document_data)
  console.log("input", input)

  // Constructing the base of the new object
  let mappedObject = {
      ...document_data, // Spread operator to copy properties
      contributors: document_data.contributors.map(contributor => ({
          ...contributor,
          organization: { ...contributor.organization }, // Deep copy if necessary
      })),
      content: {
          ...document_data.content,
          blocks: document_data.blocks.map(block => ({
              ...block
          }))
      },
      document_client,
      // Assuming the associated_org and creator can be directly copied
      associated_org: { ...document_data.associated_org },
      creator: { ...document_data.contributors[0] }, // Assuming the first contributor is the creator
  };

  // Remove properties not present in the database object
  delete mappedObject.document_data;
//   delete mappedObject.document_client;
  delete mappedObject.document_folder;

  // Any additional transformations needed to match the DB object exactly
  // can be performed here.

  return mappedObject;
}

export default mapToDbFormat;