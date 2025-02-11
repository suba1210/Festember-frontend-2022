import React, { useEffect } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { Card } from "../../components/CarouselCard/Card";
import { content } from "./assets/content";
import './style.css'
import { isBrowser } from "react-device-detect";
import {Carousel as HorizontalCarousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

function SampleNextArrow({ ...props }) {
  const { onClick } = props;
  return (
    <ChevronDownIcon
      style={{
        position: 'absolute',
        transform: 'translate(-50%, 150%) scale(2)'
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow({ ...props }) {
  const { onClick } = props;
  return (
    <ChevronUpIcon
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -150%) scale(2)'
      }}
      onClick={onClick}
    />
  );
}

export default function EventsPage() {
  const [goToSlide, setGoToSlide] = React.useState(0);
  const [eventIndex, setEventIndex] = React.useState(0);
  const [clusterIndex, setClusterIndex] = React.useState(0);

  function navigateClusters(index: number) {
    setGoToSlide(index)
    setClusterIndex(index);
    setEventIndex(0);
    // @ts-ignore
    sliderRef.current?.slickGoTo(0);
  }

  const sliderRef= React.useRef(null);
  const url = window.location.href;
  const cluster = url.split("/").pop()

  useEffect(() => {
    content.map((clusterName: any, i: any) => {
      if (cluster?.toLowerCase() == clusterName.title.split(" ").join("").toLowerCase()) {
        navigateClusters(i)
      }
    })
  }, [])
  const settings = {
    dots: false,
    infinite: false,
    vertical: true,
    slidesToShow: 1,
    adaptiveHeight: false,
    slidesToScroll: 1,
    centerMode: true,
    className: 'center',
    focusOnSelect: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (e: number) => setEventIndex(e),
  };


  function navigateEvents(event: number){
    console.log(event);
    setEventIndex(event);
  }

  const slides = content.map((slide: any, index: any) => ({
    key: index,
    content: (
      <Card color={slide.color} src={slide.src} />
    ),
    onClick: () => navigateClusters(index),
  }));

  return (
    <>
      <div className={styles.eventsLayout}>
        <div className={styles.clustersMobile}>{content[clusterIndex].title}</div>
        {isBrowser ? <div className={styles.eventTitle}>
          <Slider ref={sliderRef} {...settings}>
            {content[clusterIndex].eventDetails.map((event: any, i: any) => {
              return <div key={i}>
                <h3>{event.title}</h3>
              </div>
            })}
          </Slider>
        </div> : <div className={styles.eventTitle}>
        <HorizontalCarousel infiniteLoop={true} showStatus={false} showIndicators={false} onChange= {(e) => navigateEvents(e)}>
        {content[clusterIndex].eventDetails.map((event: any, i: any) => {
              return <div key={i}>
                <h3 style={{ marginTop:'10px', color: '#79E2FB'}}>{event.title}</h3>
              </div>
            })}
            </HorizontalCarousel>
        </div>}
        <div style={{ display: "flex", flexDirection: 'column' }}>
          <div className={styles.clusters}>{content[clusterIndex].title}</div>
          <div className={styles.carouselFix}>Hi</div>
          <Carousel
            slides={slides}
            goToSlide={goToSlide}
            showNavigation={false}
            offsetRadius={2}
            animationConfig={config.gentle}
          />
        </div>
        <div className={styles.eventDetails}>
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('description') &&
            <>
              <h3>Event Description</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details.description?.map((item: any) => {
                  return (
                    <p>{item}</p>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('format') &&
            <>
              <h3>Format</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details.format?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('rules') &&
            <>
              <h3>Rules</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details.rules?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('preliminary round') &&
            <>
              <h3>Preliminary Round</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details["preliminary round"]?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('final round') &&
            <>
              <h3>Final Round</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details["final round"]?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('judging criteria') &&
            <>
              <h3>Judgement Criteria</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details["judging criteria"]?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('photograph specifications') &&
            <>
              <h3>Photograph Specifications</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details["photograph specifications"]?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('script guidelines') &&
            <>
              <h3>Script Guidelines</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details["script guidelines"]?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('prizes') &&
            <>
              <h3>Prizes</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details.prizes?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }
          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('contact') &&
            <>
              <h3>Contact</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details.contact?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }

          {
            content[clusterIndex].eventDetails[eventIndex].details.hasOwnProperty('FAQ') &&
            <>
              <h3>FAQ</h3>
              {
                content[clusterIndex].eventDetails[eventIndex].details["FAQ"]?.map((item: any) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
              <br />
            </>
          }

          <button
            className={styles.registerButton}
            type="button"
            onClick={() => window.open(content[clusterIndex].eventDetails[eventIndex].details.link, '_blank')}
          >
            Register here
          </button>
        </div>
      </div>
    </>
  )
}
