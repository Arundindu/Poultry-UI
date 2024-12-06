import React from 'react';

const About = () => {

  let aboutPoultry = [
    {
      "heading": "1. Who We Are",
      "subHeadings": [
        {
          "subHeading": "Company Overview",
          "description": [
            {
              "type": "paragraph",
              "text": "At D C S REDDY Farms, we are a leading provider of high-quality poultry products, committed to delivering fresh, nutritious, and ethically produced chicken to our customers. Founded in 1995, our journey began with a simple mission: to nourish families with wholesome food while maintaining the highest standards of animal welfare, sustainability, and safety. Today, we are proud to be a trusted name in the poultry industry, serving across areas of Chittoor and Kadapa."
            }
          ]
        },
        {
          "subHeading": "Our Mission",
          "description": [
            {
              "type": "paragraph",
              "text": "Our mission is to provide our customers with the finest poultry products by focusing on sustainability, ethical farming practices, and quality assurance. We aim to improve the lives of our customers, employees, and communities while fostering a healthier, more sustainable food system."
            }
          ]
        }
      ]
    },
    {
      "heading": "2. Our History",
      "subHeadings": [
        {
          "subHeading": "Founding Story",
          "description": [
            {
              "type": "paragraph",
              "text": "D C S Reddy Farms was founded by Chandra Sekhar Reddy in 1995, driven by a passion for agriculture and a belief in the power of locally-sourced, fresh food. We began as a small family farm and now grown into a network of poultry facilities, serving customers far and wide. Our commitment to quality and sustainability has been at the heart of everything we do from day one."
            }
          ]
        },
        {
          "subHeading": "Milestones",
          "description": [
            {
              "type": "paragraph",
              "text": "Over the years, we have achieved several significant milestones, including:"
            },
            {
              "type": "list",
              "text": "1995: Opening of our first poultry farm."
            },
            {
              "type": "list",
              "text": "[Year]: Launch of our first branded product line in local grocery stores."
            },
            {
              "type": "list",
              "text": "[Year]: Introduction of organic and free-range poultry options."
            },
            {
              "type": "list",
              "text": "[Year]: Expansion to [Location/Region], making us a nationwide brand."
            }
          ]
        },
        {
          "subHeading": "Growth and Expansion",
          "description": [
            {
              "type": "paragraph",
              "text": `Our growth story is one of dedication, innovation, and community support.
               From a single farm to multiple farms, we have expanded operations across Chittor and Kadapa, introducing advanced farming techniques and fostering partnerships with distributors.
               We have started this with a capacity of 1500 hens and now it reached to 7000. Not only we sell poultry but also manure of highest quality which helps in good yield of crops.`
            }
          ]
        }
      ]
    }
  ]

  return (
    <div className='row col-md-12 p-0 m-0 pageContainer'>
      {aboutPoultry && aboutPoultry.length > 0 && (aboutPoultry.map((header) => {
        return (
          <>
            <h4>{header.heading}</h4>
            {header && header.subHeadings.length > 0 && (header.subHeadings.map((subHeader) => {
              return (
                <>
                  <h5>{subHeader.subHeading}</h5>
                  {subHeader && subHeader.description.length>0 && (subHeader.description.map((description)=>{
                    if(description.type === 'paragraph'){
                      return(
                        <p>{description.text}</p>
                      )
                    }
                    else if(description.type === 'list'){
                      return(
                        <>
                          <ul className='mx-1'>
                            <li>{description.text}</li>
                          </ul>
                        </>
                      )
                    }
                  }))}
                </>
              )
            }))}
          </>
        )
      }))}
    </div>
  );
};

export default About;