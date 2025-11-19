import React, { useEffect } from 'react';
import { ServiceUtils } from '../../Shared/Utils/ServiceUtils';
import Toaster from '../../Shared/Utils/Toaster';
import { CONSTANTS } from '../../Environments/config';


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

  useEffect(() => {
    checkAndSubscribeUser();
  }, []);

  async function checkAndSubscribeUser() {
    const registration = await navigator.serviceWorker.ready;

    const existing = await registration.pushManager.getSubscription();
    if (existing) {
      console.log("Already subscribed");
      return;
    }

    subscribeUser();
  }

  async function subscribeUser() {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      Toaster.error('NO PERMISSION','error')
      return;
    }
    Toaster.success('PERMISSION Step Done','success')

    const registration = await navigator.serviceWorker.ready;

    const applicationServerKey = urlBase64ToUint8Array(CONSTANTS.PUBLIC_KEY);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    });

    console.log("Push Subscription:", subscription);
    Toaster.success("subscription",'success')
    ServiceUtils.postRequest("pushNotification", {subscription:subscription}).then((response) => {
      if (response.status === "success") {
        Toaster.success("Notification permission enabled");
      } else {
        Toaster.error("Failed to save subscription");
      }
    });
  }
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }




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