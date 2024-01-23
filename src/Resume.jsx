import Section from './Section.jsx';
import './Resume.css';

export default function Resume(props) {
    return (
        <div className="resume">
          <h1 className="applicant-name">{props.generalInfo.name}</h1>
          <div className="applicant-contact-info">
            <div className="application-email-container">
              <span className="material-symbols-outlined">mail</span>
              <span className="applicant-email">{props.generalInfo.email}</span>
            </div>
            <div className="application-phone-container">
              <span className="material-symbols-outlined">call</span>
              <span className="applicant-phone-number">{props.generalInfo.number}</span>
            </div>
            <div className="application-location-container">
              <span className="material-symbols-outlined">location_on</span>
              <span className="applicant-phone-number">{props.generalInfo.location}</span>
            </div>
          </div>
          {props.sections.map(section => {
            return <Section key={section.id} sectionTitle={section.name} entries={section.entries}/>
          })}
        </div>
      );
}