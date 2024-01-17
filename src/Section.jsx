import './Section.css';

export default function Section(props) {
    const entries = props.entries.map(entry => (
            <div key={entry.id} className="entry">
                <div className="date-and-location"><span className="entry-date">{entry.date}</span><br/><span className="entry-location">{entry.location}</span></div>
                <h3 className="entry-title">{entry.title}</h3>
                <span className="role-name">{entry.role}</span>
                <div className="entry-description-div">
                    <p className="entry-description-paragraph">{entry.paragraph}</p>
                </div>
            </div>
        ));
    return (
    <div className="section">
        <h2 className="section-title">{props.sectionTitle}</h2>
        {entries}
    </div>
    )
}