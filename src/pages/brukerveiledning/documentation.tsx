import React from "react";
import DocumentationMain from "~/components/brukerveiledning/DocumentationMain";
import HeaderComponent from "~/components/postoppsett/reusable/HeaderComponent";

const documentation = () => {
  return (
    <div className="bg-white">
      <HeaderComponent colorMode="darkmode" />

      <DocumentationMain />
    </div>
  );
};

export default documentation;
