import React from 'react';

const DescriptionSpecification = ({ data }) => {
  if (!data || !data.item) return null;

  const { info, attributes, manuals, videos, application } = data.item;
  const manualBaseURL = "https://dyq4yrh81omo6.cloudfront.net/manuals/";
  const applicationImageBaseURL = "https://dyq4yrh81omo6.cloudfront.net/items/580/";

  return (
    <div className="Description-Specification-container">
      {/* Description section */}
      <div className="inline-Description">
        <div className="Description ">
          <p id="Description-heading">Description</p>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: info }} id="Description-content"></div>
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

      {/* User-manual section */}
      <div className="padding-user-manual">
        <div className="user-manual">
          <p id="User-manual">User manual</p>
          <hr />
          <div className="pdf-icon-padding">
            {manuals && manuals.manual && manuals.manual.length > 0 ? (
              manuals.manual.map((manual, index) => (
                <a key={index} href={`${manualBaseURL}${manual.file}`} download>
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

      {/* Video section */}
      <div className="video-section">
        <p id="Videos">Videos</p>
        <hr />
        {videos && videos.length > 0 ? (
        videos.map((videoURL, index) => (
            <iframe
              key={index}
              width="560"
              height="315"
              src={videoURL}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>

      {/* Application Images section */}
      <div className="application-images-section">
        <p id="ApplicationImages">Application Images</p>
        <hr />
        <div className="application-images-container">
        {application && application.images && application.images.length > 0 ? (
          application.images.map((image, index) => (
            <div key={index} className="application-image-container">
            <img className="application-image" src={`https://dyq4yrh81omo6.cloudfront.net/items/580/${image}`} alt={`Application ${index + 1}`} />  
            </div>       
             ))
        ) : (
          <p>No application images available.</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSpecification;
