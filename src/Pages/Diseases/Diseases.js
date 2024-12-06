import React, { useState } from 'react'
import './Diseases.scss'
import classNames from 'classnames'

const Diseases = () => {
  // const [diseaseList,setDiseaseList] = useState([]);
  let diseases = [
    {
      "disease": "Newcastle Disease",
      "description": "Newcastle disease (ND) is a highly contagious and often severe viral disease affecting birds, particularly domestic poultry like chickens. It's caused by a virulent strain of avian paramyxovirus type 1 (APMV-1). The disease can cause significant economic losses to the poultry industry due to high mortality rates and production drops. The symptoms are mainly divided into 4 types as Respiratory(Difficulty breathing, coughing, gasping, nasal discharge), Nervous(Tremors, paralysis, incoordination, head tilt), Digestive(Diarrhea (often green), loss of appetite), General(Depression, lethargy, decreased egg production, soft-shelled eggs, sudden death). Newcastle Disease Vaccine, B1 Type, LaSota Strain, has been shown to be effective for the vaccination of healthy chickens 1 day, 2 weeks or 4 weeks of age and older against Newcastle Disease.",
      "diseaseImagePath": "NewCastleDisease.webp",
      "vaccineImagePath": "Newcastle_Disease_Vaccine.jpg"
    },
    {
      "disease": "Infectious Bronchitis",
      "description": "Infectious bronchitis (IB) is a highly contagious viral disease affecting chickens, primarily characterized by respiratory symptoms. It is caused by the infectious bronchitis virus (IBV), which belongs to the family Coronaviridae. Here’s an overview of infectious bronchitis in poultry, including its symptoms, treatment, and prevention. The symptoms are Respiratory Signs [Sneezing, Coughing (typically dry, honking), Tracheal rales (rattling sounds in the throat), Nasal discharge (often watery and clear), Respiratory distress (difficulty breathing)], General Signs [Watery eyes, Depression and decreased activity] and sometimes it can affect other organs, leading to kidney damage, reproductive tract disorders, and decreased weight gain in broilers. Bronchitis Vaccine will be given first in the hatchery at 1 day of age and booster vacination is given usually at 2-3 weeks of age.",
      "diseaseImagePath": "InfectiousBonchitis.webp",
      "vaccineImagePath": "Bronchitis_Vaccine.jpg"
    },
    {
      "disease": "Avian Influenza (Bird Flu)",
      "description": "This is a respiratory disease that can be caused by a variety of influenza A viruses. It can infect chickens, turkeys, ducks, geese, and other birds. Symptoms can vary depending on the strain of the virus, but they can include fever, coughing, sneezing, and difficulty breathing. Avian influenza can also cause sudden death in poultry.",
      "diseaseImagePath": "BirdFlu.jpg",
      "vaccineImagePath": "Newcastle_Disease_Vaccine.jpg"
    },
    {
      "disease": "Coccidiosis",
      "description": "This is a parasitic disease that affects the intestines of poultry. Symptoms include bloody diarrhea, weight loss, and lethargy. Coccidiosis can be fatal in young chicks.",
      "diseaseImagePath": "hen.jpg",
      "vaccineImagePath": "Newcastle_Disease_Vaccine.jpg"
    },
    {
      "disease": "Marek's Disease",
      "description": "This is a neoplastic disease that can cause tumors in various organs of poultry. Symptoms can vary depending on the location of the tumor, but they can include weight loss, paralysis, and difficulty breathing. Marek's disease can be fatal in poultry.",
      "diseaseImagePath": "MareksDisease.webp",
      "vaccineImagePath": "Newcastle_Disease_Vaccine.jpg"
    },
    {
      "disease": "Fowl Cholera",
      "description": "This is a bacterial disease that can infect all types of poultry. Symptoms include fever, loss of appetite, diarrhea, and green discharge from the nose. Fowl cholera can be fatal in poultry.",
      "diseaseImagePath": "FowlCholera.webp",
      "vaccineImagePath": "Newcastle_Disease_Vaccine.jpg"
    },
    {
      "disease": "Pullorum Disease",
      "description": "This is a bacterial disease that can infect chickens and turkeys. Symptoms include diarrhea, weight loss, and listlessness. Pullorum disease can be fatal in young chicks.",
      "diseaseImagePath": "Pollurum.webp",
      "vaccineImagePath": "Newcastle_Disease_Vaccine.jpg"
    }
  ]
  // setDiseaseList([...diseases])
  const [cardId, setCardId] = useState(0)
  const activeCard = (index) => {
    if (cardId === index) {
      setCardId()
    }
    else {
      setCardId(index)
    }
  }
  return (
    <div className='pageContainer'>
      <div className='col-md-12 col-12'>
        {
          (diseases && diseases.length > 0) && diseases.map((element, index) => {
            let data = `require(../../Assets/Images/${element["diseaseImagePath"]}`;
            return (
              <div style={{ fontSize: '1rem' }} className='card m-3'>
                <div className='card-header d-flex justify-content-between align-items-center'>
                  <h5 className='fw-bold'>{element.disease}</h5>
                  <span>
                    <i className={`fa fa-2x cursor-pointer ${cardId === index ? 'fa-angle-down' : 'fa-angle-up'}`} aria-hidden="true" onClick={() => activeCard(index)}></i>
                  </span>
                </div>
                <div className={classNames('card-body', { 'd-none': cardId !== index }, (window.innerWidth > 426) ? "d-flex" : "")}>
                  <img style={{ height: '15rem', width: '15rem' }} src={require(`../../Assets/Images/${element?.diseaseImagePath}`)} alt="..." />
                  <p className='p-2 d-flex align-items-center'>{element.description}</p>
                  <img style={{ height: '15rem', width: '15rem' }} src={require(`../../Assets/Images/${element?.vaccineImagePath}`)} alt="..." />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Diseases