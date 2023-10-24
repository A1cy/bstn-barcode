import React from 'react';

const DescriptionSpecification = ({ data }) => {
  if (!data || !data.item) return null;

  const { short_info, attributes, manuals } = data.item;
  const baseURL = "https://dyq4yrh81omo6.cloudfront.net/manuals/";

  return (
    <div className="header-content-container">
      <div className="Description-Specification-container">
        {/* Description section */}
        <div className="inline-Description">
          <div className="Description ">
            <p id="Description-heading">Description</p>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: short_info }} id="Description-content"></div>
          </div>
        </div>
        {/* Specification section */}
        <div className="Specification">
          <p id="Specification">Specification</p>
          <hr />
          <table className="specification-table">
            <tbody>
              {attributes.map((attr, index) => (
                <tr key={index}>
                  <td className="left-column">{attr.attribute_name}</td>
                  <td className="right-column">{attr.attribute_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* user-manual section */}
        <div className="padding-user-manual">
          <div className="user-manual">
            <p id="User-manual">User manual</p>
            <hr />
            <div className="pdf-icon-padding">
              {manuals && manuals.length > 0 ? (
                manuals.map((manual, index) => (
                  <a key={index} href={`${baseURL}${manual.file}`} download>
                    <img className="pdf-icon" src="/pics/pdf-icon.png" alt="pdf" />
                    <span id="User-manual-pdf">{manual.title}</span>
                  </a>
                ))
              ) : (
                <p>No manuals available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSpecification;
