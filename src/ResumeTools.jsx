import './ResumeTools.css';
import { useState, useRef } from "react";

export default function ResumeTools(props) {
    const workEntriesCustomInputs = props.workEntries.map((entry) => 
    {
        return [
            <CustomInput key={entry.id} inputId={"company-name-input"} label={"Company Name"} value={entry.title} type={"text"} saveInto={(entry, value) => {return {...entry, title: value}}} onChange={props.onWorkEntryChange} entry={entry}/>,
            <CustomInput key={entry.id} inputId={"role-input"} label={"Role"} value={entry.role} type={"text"} saveInto={(entry, value) => {return {...entry, role: value}}} onChange={props.onWorkEntryChange} entry={entry}/>
        ]
    });
    const educationEntriesCustomInputs = props.educationEntries.map((entry) => 
    {
        return [
            <CustomInput key={entry.id} inputId={"institute-input"} label={"Institute"} value={entry.title} type={"text"} saveInto={(entry, value) => {return {...entry, title: value}}} onChange={props.onEducationEntryChange} entry={entry}/>
        ]
    });
    return (
        <div className="section-editor-container">
            <SectionEditor 
                entries={props.workEntries} 
                onChange={props.onWorkEntryChange}
                customInputs={workEntriesCustomInputs}
                editorHeading={"Work-Experience"}
                editorClassName={"work-experience-editor-container"}>
            </SectionEditor>
            <SectionEditor 
                entries={props.educationEntries} 
                onChange={props.onEducationEntryChange}
                customInputs={educationEntriesCustomInputs}
                editorHeading={"Education"}
                editorClassName={"education-editor-container"}>
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
            <div className="entry" key={entry.id}>
                {!isEntryClicked[index] && 
                <button className="button-container" onClick={() => {
                    isEntryClickedHandler(index);
                }}>
                    <h3 className="field-heading">{entry.title}</h3>
                </button>}
                {isEntryClicked[index] && 
                <>{props.customInputs[index].map((input) => {
                    return(input)
                }
                )}<button onClick={() => {
                    isEntryClickedHandler(index);
                    props.onChange(entry.id, entryCopies.current[index]);
                }}>
                    Cancel
                </button>
                <button onClick={() => {
                    isEntryClickedHandler(index);
                    entryCopies.current[index] = entry;
                }}>
                    Save
                </button></>
                }
            </div>
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
            {isVisible && inputContainers}
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