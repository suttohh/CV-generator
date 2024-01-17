import Section from './Section.jsx';
import './Resume.css';

export default function Resume(props) {
    return (
        <div className="resume">
          <h1 className="applicant-name">Justin Sutton</h1>
          <div className="applicant-contact-info">
            <div className="application-email-container">
              <span className="material-symbols-outlined">mail</span>
              <span className="applicant-email">justin-sutton98@outlook.com</span>
            </div>
            <div className="application-phone-container">
              <span className="material-symbols-outlined">call</span>
              <span className="applicant-phone-number">0477962174</span>
            </div>
            <div className="application-location-container">
              <span className="material-symbols-outlined">location_on</span>
              <span className="applicant-phone-number">Parkes, NSW</span>
            </div>
          </div>
          <Section sectionTitle="Work Experience" entries={props.workEntries}/>
          <Section sectionTitle="Education" entries={props.educationEntries}/>
          <Section sectionTitle="Languages, Skills & Interests" entries={props.lsiList}/>
        </div>
      );
}