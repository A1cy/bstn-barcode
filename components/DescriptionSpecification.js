import React from 'react';

const DescriptionSpecification = ({ data }) => {
  if (!data || !data.item) return null;

  const { info, short_info,short_description, attributes, manuals, videos, application } = data.item;

  const baseURL = "https://dyq4yrh81omo6.cloudfront.net/manuals/";
  const applicationBaseURL = "https://dyq4yrh81omo6.cloudfront.net/items/580/";

  return (
    <div className="Description-Specification-container">
      {short_info && (
        <div className="inline-Description">
          <div className="Description ">
            <p id="Description-heading">Description</p>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: info }} id="Description-content"></div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: short_info }} id="Description-content"></div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: short_description }} id="Description-content"></div>
          </div>
        </div>
      )}

      {attributes && attributes.length > 0 && (
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
      )}

      {manuals && manuals.manual && manuals.manual.length > 0 && (
        <div className="padding-user-manual">
          <div className="user-manual">
            <p id="User-manual">User manual</p>
            <hr />
            <div className="pdf-icon-padding">
              {manuals.manual.map((manual, index) => (
                <a key={index} href={`${baseURL}${manual.file}`} download>
                  <img className="pdf-icon" src="/pics/pdf-icon.png" alt="pdf" />
                  <span id="User-manual-pdf">{manual.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {application && application.images && application.images.length > 0 && (
        <div className="application-images-section">
          <p id="Application-images">Application Images</p>
          <hr />
          <div className="application-image-container">
            {application.images.map((image, index) => (
                <div key={index} className="application-image-container">
              <img className="application-image" src={`${applicationBaseURL}${image}`} alt={`Application ${index + 1}`} />
            </div>
            ))}
          </div>
        </div>
      )}

      {videos && videos.length > 0 && (
        <div className="videos">
          <p id="Videos">Videos</p>
          <hr />
          {videos.map((video, index) => (
            <iframe
              key={index}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      )}
    </div>
  );
};

export default DescriptionSpecification;
