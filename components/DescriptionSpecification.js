import React from "react";

const DescriptionSpecification = ({ data }) => {
  if (!data || !data.item) return null;

  const { short_description, info, short_info, attributes, manuals, application, videos } = data.item;
  const baseURL = "https://dyq4yrh81omo6.cloudfront.net/manuals/";
  const appImageBaseURL = "https://dyq4yrh81omo6.cloudfront.net/items/580/";

  return (
    <div className="Description-Specification-container">
      {/* Description section */}
      {short_info && (
        <div className="inline-Description">
          <div className="Description">
            <p id="Description-heading">Description</p>
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: short_info }}
              id="Description-content"
            ></div>
            <div
              dangerouslySetInnerHTML={{ __html: info }}
              id="Description-content"
            ></div>
            <div
              dangerouslySetInnerHTML={{ __html: short_description }}
              id="Description-content"
            ></div>
          </div>
        </div>
      )}

      {/* Specification section */}
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

      {/* User-manual section */}
      {manuals && manuals.manual && manuals.manual.length > 0 && (
        <div className="padding-user-manual">
          <div className="user-manual">
            <p id="User-manual">User manual</p>
            <hr />
            <div className="pdf-icon-padding">
              {manuals.manual.map((manual, index) => (
                <a key={index} href={`${baseURL}${manual.file}`} download>
                  <img
                    className="pdf-icon"
                    src="/pics/pdf-icon.png"
                    alt="pdf"
                  />
                  <span id="User-manual-pdf">{manual.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Application Images */}
      {application && application.images && application.images.length > 0 && (
        <div className="application-images-section">
          <div className="application-images">
            <p id="Application-images">Application Images</p>
            <hr />
            <div className="image-grid">
              {application.images.map((image, index) => (
                <img
                  key={index}
                  src={`${appImageBaseURL}${image}`}
                  alt="Application"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Videos */}
      {videos && videos.length > 0 && (
        <div className="video-section">
          <p id="Videos">Videos</p>
          <hr />
          <div className="video-grid">
            {videos.map((video, index) => (
              <iframe
                key={index}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionSpecification;
