import './ResumeTools.css';
import { useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ResumeTools(props) {
    const sectionEntryCustomInputs = props.sections.map(section => {
        return section.entries.map(entry => {
            if(section.isFreeText) {
                return [<CustomTextArea key={1} inputId={"description-input"} sectionId={section.id} label={"Description"} value={entry.paragraph} onChange={(value) => {props.onSectionEntryChangeHandler(section.id, {...entry, paragraph: value})}} entry={entry}/>];
            } else {
                return [
                    <CustomInput key={1} inputId={"company-name-input"} sectionId={section.id} label={"Company Name"} value={entry.title} type={"text"} isValidated={true} validation={isInputValid} validationMessage={"Please enter a valid value"} onChange={(value) => {props.onSectionEntryChangeHandler(section.id, {...entry, title: value})}} entry={entry}/>,
                    <CustomInput key={2} inputId={"role-input"} sectionId={section.id} label={"Role"} value={entry.role} type={"text"} onChange={(value) => {props.onSectionEntryChangeHandler(section.id, {...entry, role: value})}} entry={entry}/>,
                    <CustomTextArea key={3} inputId={"description-input"} sectionId={section.id} label={"Description"} value={entry.paragraph} onChange={(value) => {props.onSectionEntryChangeHandler(section.id, {...entry, paragraph: value})}} entry={entry}/>,
                    <CustomInput key={4} inputId={"date-input"} sectionId={section.id} label={"Date Range"} value={entry.date} onChange={(value) => {props.onSectionEntryChangeHandler(section.id, {...entry, date: value})}} entry={entry}/>,
                    <CustomInput key={5} inputId={"location-input"} sectionId={section.id} label={"Location"} value={entry.location} onChange={(value) => {props.onSectionEntryChangeHandler(section.id, {...entry, location: value})}} entry={entry}/>
                ]
            }
        })
    })
    const generalInfoCustomInputs = [
        [
            <CustomInput key={1} inputId={"applicant-name-input"} label={"Applicant Name"} value={props.generalInfo.name} type={"text"} onChange={(value) => {props.onGeneralInfoChange(1, {...props.generalInfo, name: value})}} entry={[props.generalInfo]}/>,
            <CustomInput key={2} inputId={"applicant-email-input"} label={"Email"} value={props.generalInfo.email} type={"text"} onChange={(value) => {props.onGeneralInfoChange(2, {...props.generalInfo, email: value})}} entry={[props.generalInfo]}/>,
            <CustomInput key={3} inputId={"applicant-number-input"} label={"Number"} value={props.generalInfo.number} onChange={(value) => {props.onGeneralInfoChange(3, {...props.generalInfo, number: value})}} entry={[props.generalInfo]}/>,
            <CustomInput key={4} inputId={"applicant-location-input"} label={"Location"} value={props.generalInfo.location} onChange={(value) => {props.onGeneralInfoChange(4, {...props.generalInfo, location: value})}} entry={[props.generalInfo]}/>
        ]
    ];
    return (
        <div className="section-editor-container">
            <SectionEditor 
                section={
                    {
                        id: 1,
                        isFreeText: true,
                        name: "Personal Details",
                        className: "personal-details",
                        entries: [props.generalInfo]
                    }  
                } 
                customInputs={generalInfoCustomInputs}
                onChange={props.onGeneralInfoChange}>
            </SectionEditor>
            {props.sections.map((section, index) => {
                if(section.isEditing) {
                    return <NewSectionEditor key={section.id} section={section} sections={props.sections} onSectionChangeHandler={props.onSectionChangeHandler}/>;
                } else {
                    return (
                        <SectionEditor
                            key={section.id}
                            section={section}
                            customInputs={sectionEntryCustomInputs[index]}
                            onChange={props.onSectionEntryChangeHandler}
                            >
                        </SectionEditor>
                    );
                }
            })}
            <SectionAdder sections={props.sections} onSectionChangeHandler={props.onSectionChangeHandler}/>
        </div>
    );
}

function SectionEditor(props) {
    const entryCopies = useRef([...props.section.entries]);
    //Used to determine when to display all entry options
    const [isVisible, setVisible] = useState(false);
    //Used to determine when to display entry specific components
    const [isEntryClicked, setIsEntryClicked] = useState(props.section.entries.map(() => false));
    const isEntryClickedHandler = (entryIndex) => 
    setIsEntryClicked(isEntryClicked.map((item, itemIndex) => {
        if(itemIndex == entryIndex) {
            return !item;
        } else {
            return item;
        }
    }));
    const addIsEntryClickedHandler = (value) => {
        setIsEntryClicked(isEntryClicked.concat(value));
    }
    const inputContainers = props.section.entries.map((entry, index) => {
        return (
            <>
                <InputContainer keyId={index} sectionId={props.section.id} setCopy={(entry) => entryCopies.current[index] = entry} isFreeText={props.section.isFreeText} isEntryClicked={isEntryClicked[index]} isEntryClickedHandler={() => isEntryClickedHandler(index)} entry={entry} customInputs={props.customInputs[index]} entryHeading={props.entryHeading}
                entryCopy={entryCopies.current[index]} onChange={props.onChange}/>
            </>
        );
    });
    return(
        <div className={props.section.className + " editor-container"}>
            <button className="button-container" onClick={() => {
                setVisible(!isVisible);
            }}>
                <h2 className="editor-heading">{props.section.name}</h2>
                <span className={isVisible ? "material-symbols-outlined expand-icon" : "material-symbols-outlined expand-icon open"}>expand_more</span>
            </button>
            {isVisible && <>
            {inputContainers}
            {!props.section.isFreeText && <EntryAdder sectionId={props.section.id} onSectionEntryChangeHandler={props.onChange} addIsEntryClickedHandler={addIsEntryClickedHandler} entryCopies={entryCopies} entries={props.section.entries}/>}
            </>}
        </div>
    );
}

function CustomInput(props) {
    const [isValid, setIsValid] = useState(props.validation != null && props.validation(props.value));
    return(
        <div className="input-container">
            <label className="editor-label">{props.label}
                <input name={props.inputId} type={props.type} value={props.value} onChange={(event) => {
                    props.onChange(event.target.value)
                    if(props.isValidated === true && props.validation(event.target.value)) {
                        setIsValid(true);
                    } else if(props.isValidated === true && props.validation(event.target.value) == false) {
                        setIsValid(false);
                    }
                }}>
                </input>
            </label>
            {props.isValidated && <span className="input-error">{!isValid && props.validationMessage}</span>}
        </div>
    );
}

function CustomTextArea(props) {
    return(
        <div className="input-container">
            <label className="editor-label">{props.label}
                <textarea name={props.inputId} rows="5" value={props.value} onChange={(event) => {
                    props.onChange(event.target.value)
                }}>
                </textarea>
            </label>
        </div>
    );
}

function InputContainer(props) {
    const inputsCancelSave = (
        <>
            {props.customInputs.map((input) => {
                console.log(input.isValidated);
                return(input)
            })}
            <div className="button-flex">
                <button className="cancel-button" onClick={() => {
                    props.isEntryClickedHandler();
                    props.onChange(props.sectionId, props.entryCopy);
                }}>
                    Cancel
                </button>
                <button className="save-button" onClick={() => {
                    props.isEntryClickedHandler();
                    props.setCopy(props.entry);
                }} disabled={!props.isFreeText && !isInputValid(props.entry.title)}>
                    Save
                </button>
            </div>
         </>
    );
    if(props.isFreeText) {
        return inputsCancelSave;
    } else {
        return (
            <div className="entry-editor" key={props.keyId}>
                {!props.isEntryClicked && 
                <button className="button-container" onClick={() => {
                    props.isEntryClickedHandler();
                }}>
                <h3 className="field-heading">{props.entryHeading || props.entry.title}</h3>
                </button>}
                {props.isEntryClicked && 
                inputsCancelSave}
            </div>
        )
    }
}

function EntryAdder(props) {
    return (
        <>
            <button 
                onClick={() => {
                    const newEntry = {
                        id: uuidv4(),
                        isEditing: true,
                        isFreeText: false,
                        title: "",
                        role: "",
                        date: "",
                        location: ""
                    };
                    props.onSectionEntryChangeHandler(
                        props.sectionId,
                        newEntry
                    );
                    props.addIsEntryClickedHandler(true);
                    props.entryCopies.current = [...props.entryCopies.current, newEntry];
                }}
                className="entry-adder">
                <span className="material-symbols-outlined entry-adder-icon">add</span>
            </button>
        </>
        );
}

function SectionAdder(props) {
    return (
    <>
        <button 
            onClick={() => {
                props.onSectionChangeHandler(
                    props.sections,
                    {
                        id: uuidv4(),
                        isFreeText: false,
                        isEditing: true,
                        name: "",
                        className: "",
                        entries: []
                    }
                );
            }}
            className="section-adder">
            <span className="material-symbols-outlined section-adder-icon">add</span>
        </button>
    </>
    );
}

function NewSectionEditor(props) {
    const [isSectionNameValid, setIsSectionNameValid] = useState(false);
    const invalidSectionNameMsg = "Please enter a valid value";
    return (
        <div className="editor-container">
            <div key={props.section.id} className="input-container">
                <label className="editor-label">Section Heading
                    <input name={"new-section-editor-input"} type="text" value={props.section.name} onChange={(event) => {
                            props.onSectionChangeHandler(props.sections, {...props.section, name: event.target.value, className: event.target.value.toLowerCase()});
                            const regexCheck = new RegExp("^[A-Za-z][A-Za-z0-9 -]*$");
                            if(regexCheck.test(event.target.value)) {
                                setIsSectionNameValid(true);
                            } else {
                                setIsSectionNameValid(false);
                            }
                        }
                    }>
                    </input>
                </label>
                <span className="input-error">{!isSectionNameValid && invalidSectionNameMsg}</span>
                <div className="text-only-checkbox-div">
                    <label className="text-only-checkbox">Free text only?</label>
                    <input name={"new-section-editor-checkbox"} type="checkbox" value={props.section.isFreeText} onChange={(event) => {
                                props.onSectionChangeHandler(props.sections, {...props.section, isFreeText: event.target.value});
                            }
                        }>
                    </input>
                </div>
                <button className="save-button" onClick={() => {
                    props.onSectionChangeHandler(props.sections, {...props.section, isEditing: false});
                }} disabled={!isSectionNameValid}>
                    Save
                </button>
            </div>
        </div>
    );
}

function isInputValid(value) {
    const regexCheck = new RegExp("^[A-Za-z][A-Za-z0-9 -]*$");
                if(regexCheck.test(value)) {
                    return true;
                } else {
                    return false;
                }
}