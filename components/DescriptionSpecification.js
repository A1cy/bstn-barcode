import React from 'react';

const DescriptionSpecification = ({ data }) => {
  if (!data || !data.item) return null;

  const { info, attributes, manuals, videos, application } = data.item;
  const baseURL = "https://dyq4yrh81omo6.cloudfront.net/manuals/";

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

      {/* Video section */}
      <div className="video-section">
        <p id="Videos">Videos</p>
        <hr />
        {videos && videos.length > 0 ? (
          videos.map((video, index) => (
            // You might need to adjust how the video is displayed.
            <video key={index} width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>

      {/* Application Images section */}
      <div className="application-images-section">
        <p id="ApplicationImages">Application Images</p>
        <hr />
        {application && application.images && application.images.length > 0 ? (
          application.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Application Image ${index + 1}`} />
          ))
        ) : (
          <p>No application images available.</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionSpecification;
