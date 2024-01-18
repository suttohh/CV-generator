import './ResumeTools.css';
import { useState, useRef } from "react";

export default function ResumeTools(props) {
    const workEntriesCustomInputs = props.workEntries.map((entry) => 
    {
        return [
            <CustomInput key={1} inputId={"company-name-input"} label={"Company Name"} value={entry.title} type={"text"} saveInto={(entry, value) => {return {...entry, title: value}}} onChange={props.onWorkEntryChange} entry={entry}/>,
            <CustomInput key={2} inputId={"role-input"} label={"Role"} value={entry.role} type={"text"} saveInto={(entry, value) => {return {...entry, role: value}}} onChange={props.onWorkEntryChange} entry={entry}/>,
            <CustomTextArea key={3} inputId={"description-input"} label={"Description"} value={entry.paragraph} saveInto={(entry, value) => {return {...entry, paragraph: value}}} onChange={props.onWorkEntryChange} entry={entry}/>,
            <CustomInput key={4} inputId={"date-input"} label={"Date Range"} value={entry.date} saveInto={(entry, value) => {return {...entry, date: value}}} onChange={props.onWorkEntryChange} entry={entry}/>,
            <CustomInput key={5} inputId={"location-input"} label={"Location"} value={entry.location} saveInto={(entry, value) => {return {...entry, location: value}}} onChange={props.onWorkEntryChange} entry={entry}/>
        ]
    });
    const educationEntriesCustomInputs = props.educationEntries.map((entry) => 
    {
        return [
            <CustomInput key={1} inputId={"institute-input"} label={"Institute"} value={entry.title} type={"text"} saveInto={(entry, value) => {return {...entry, title: value}}} onChange={props.onEducationEntryChange} entry={entry}/>,
            <CustomInput key={2} inputId={"degree-input"} label={"Degree/Certificate"} value={entry.role} type={"text"} saveInto={(entry, value) => {return {...entry, role: value}}} onChange={props.onEducationEntryChange} entry={entry}/>,
            <CustomTextArea key={3} inputId={"description-input"} label={"Description"} value={entry.paragraph} saveInto={(entry, value) => {return {...entry, paragraph: value}}} onChange={props.onEducationEntryChange} entry={entry}/>,
            <CustomInput key={4} inputId={"date-input"} label={"Date Range"} value={entry.date} saveInto={(entry, value) => {return {...entry, date: value}}} onChange={props.onEducationEntryChange} entry={entry}/>,
            <CustomInput key={5} inputId={"location-input"} label={"Location"} value={entry.location} saveInto={(entry, value) => {return {...entry, location: value}}} onChange={props.onEducationEntryChange} entry={entry}/>
        ]
    });
    const lsiCustomTextArea = [[<CustomTextArea key={1} inputId={"lsi-input"} label={"Description"} value={props.lsi.paragraph} saveInto={(id, value) => {return {paragraph: value}}} onChange={props.onLSIChange} entry={[props.lsi]}/>]]
    const generalInfoCustomInputs = [
        [
            <CustomInput key={1} inputId={"applicant-name-input"} label={"Applicant Name"} value={props.generalInfo.name} type={"text"} saveInto={(id, value) => {return {...props.generalInfo, name: value}}} onChange={props.onGeneralInfoChange} entry={[props.generalInfo]}/>,
            <CustomInput key={2} inputId={"applicant-email-input"} label={"Email"} value={props.generalInfo.email} type={"text"} saveInto={(id, value) => {return {...props.generalInfo, email: value}}} onChange={props.onGeneralInfoChange} entry={[props.generalInfo]}/>,
            <CustomInput key={3} inputId={"applicant-number-input"} label={"Number"} value={props.generalInfo.number} saveInto={(id, value) => {return {...props.generalInfo, number: value}}} onChange={props.onGeneralInfoChange} entry={[props.generalInfo]}/>,
            <CustomInput key={4} inputId={"applicant-location-input"} label={"Location"} value={props.generalInfo.location} saveInto={(id, value) => {return {...props.generalInfo, location: value}}} onChange={props.onGeneralInfoChange} entry={[props.generalInfo]}/>
        ]
    ];
    return (
        <div className="section-editor-container">
            <SectionEditor 
                entries={[props.generalInfo]} 
                customInputs={generalInfoCustomInputs}
                editorHeading={"General Info"}
                editorClassName={"general-info-editor-container"}
                entryHeading={props.generalInfo.name}
                onChange={props.onGeneralInfoChange}>
            </SectionEditor>
            <SectionEditor 
                entries={props.workEntries} 
                customInputs={workEntriesCustomInputs}
                editorHeading={"Work Experience"}
                editorClassName={"work-experience-editor-container"}
                onChange={props.onWorkEntryChange}>
            </SectionEditor>
            <SectionEditor 
                entries={props.educationEntries} 
                customInputs={educationEntriesCustomInputs}
                editorHeading={"Education"}
                editorClassName={"education-editor-container"}
                onChange={props.onEducationEntryChange}>
            </SectionEditor>
            <SectionEditor 
                entries={[props.lsi]} 
                customInputs={lsiCustomTextArea}
                editorHeading={"Other"}
                editorClassName={"languages-skills-interests-editor-container"}
                entryHeading={"Languages, Skills & Interests"}
                onChange={props.onLSIChange}>
            </SectionEditor>
            <SectionEditor 
                entries={[]} 
                customInputs={lsiCustomTextArea}
                editorHeading={"Test"}
                editorClassName={"other-editor-container"}
                entryHeading={"Languages, Skills & Interests"}>
            </SectionEditor>
        </div>
    );
}

function SectionEditor(props) {
    const entryCopies = useRef([...props.entries]);
    //Used to determine when to display all entry options
    const [isVisible, setVisible] = useState(false);
    //Used to determine when to display entry specific components
    const [isEntryClicked, setIsEntryClicked] = useState(props.entries.map(() => false));
    const isEntryClickedHandler = (entryIndex) => 
    setIsEntryClicked(isEntryClicked.map((item, itemIndex) => {
        if(itemIndex == entryIndex) {
            return !item;
        } else {
            return item;
        }
    }));
    const inputContainers = props.entries.map((entry, index) => {
        return (
            <>
                <InputContainer keyId={index} isEntryClicked={isEntryClicked[index]} isEntryClickedHandler={() => isEntryClickedHandler(index)} entry={entry} customInputs={props.customInputs[index]} entryHeading={props.entryHeading}
                entryCopy={entryCopies.current[index]} onChange={props.onChange}/>
            </>
        );
    });
    return (
        <div className={props.editorClassName + " editor-container"}>
            <button className="button-container" onClick={() => {
                //Select the button icon corresponding to the current entry
                const icon = document.querySelector("." + props.editorClassName + " > button > .expand-icon");
                //Checks to see if components are CURRENTLY visible. E.G. If currently visible, remove .open and set to not visible
                isVisible ? icon.classList.remove("open") : icon.classList.add("open");
                setVisible(!isVisible);
            }}>
                <h2 className="editor-heading">{props.editorHeading}</h2>
                <span className="material-symbols-outlined expand-icon">expand_more</span>
            </button>
            {isVisible && 
            <>
                {inputContainers}
            </>
            }
        </div>
    );
    
}

function CustomInput(props) {
    return(
        <div className="input-container">
            <label className="editor-label">{props.label}
                <input name={props.inputId} type={props.type} value={props.value} onChange={(event) => {
                    props.onChange(props.entry.id, props.saveInto(props.entry, event.target.value))
                }}>
                </input>
            </label>
        </div>
    );
}

function CustomTextArea(props) {
    return(
        <div className="input-container">
            <label className="editor-label">{props.label}
                <textarea name={props.inputId} rows="5" value={props.value} onChange={(event) => {
                    props.onChange(props.entry.id, props.saveInto(props.entry, event.target.value))
                }}>
                </textarea>
            </label>
        </div>
    );
}

function InputContainer(props) {
    return (
    <div className="entry" key={props.keyId}>
        {!props.isEntryClicked && 
        <button className="button-container" onClick={() => {
            props.isEntryClickedHandler();
        }}>
        <h3 className="field-heading">{props.entryHeading || props.entry.title}</h3>
        </button>}
        {props.isEntryClicked && 
        <>{props.customInputs.map((input) => {
            return(input)
        })}<button className="cancel-button" onClick={() => {
            props.isEntryClickedHandler();
            props.onChange(props.entry.id, props.entryCopy);
        }}>
            Cancel
        </button>
        <button className="save-button" onClick={() => {
            props.isEntryClickedHandler();
            props.entryCopy = props.entry;
        }}>
            Save
        </button></>}
    </div>)
}