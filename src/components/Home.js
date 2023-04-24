import React, { useEffect } from 'react';
import './Homee.css';
import modi from './modi.jpg';
import messagee from './message.png';
import progress from './Progress.png';
import gallery from './gallery.png';

import goal from './goal.mp4';

import inboxvideo from './inboxVideo.mp4';
import progresses from './progress.mp4';


function Homee() {
  
  return (
    <>
      <div class="mainPage">
       

        <section>
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-interval="2900"
            data-ride="false"
          >
            <div class="carousel-inner" id="mainPage">
              <div class="carousel-item active">
                <img
                  class="d-block w-100 images-slideshow"
                  src={modi}
                  alt="First slide"
                />
              </div>
              
              
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon prev-raise"
                aria-hidden="true"
              ></span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon next-raise"
                aria-hidden="true"
              ></span>
            </a>
          </div>
        </section>

        <section class="services" id="services">
          <div class="main-wrapper">
            <div class="bg-1"></div>
            <div class="bg-2"></div>

            <div class="top-heading">
              <h1>Services</h1>
            </div>
            <div class="hori-div">
              <hr class="horizontal" />
            </div>

            <div class="cards-container">
              <div class="cards">
                <div>
                  <img src={messagee} alt="" />
                </div>
                <div class="heading">Chat Room</div>
                <div class="text">
                  User can make full use of chat rooms and send all the problems
                  to respective organisation.
                </div>
              </div>
              <div class="cards">
                <div>
                  <img src={progress} alt="" class="progress-pic" />
                </div>
                <div class="heading">Examine</div>
                <div class="text">
                  Respective MLAs can examine the users problem. They will
                  forward and talk to the respective organisation.
                </div>
              </div>

              <div class="cards">
                <div>
                  <img src={gallery} alt="" />
                </div>
                <div class="heading">Gallery</div>
                <div class="text">
                  User will get access to all the photos and updates of events
                  held by the Prime Minister of India.
                </div>
              </div>
            </div>
          </div>
        </section>
        <h1 class="about-head" id="about">
          <strong>About</strong>
        </h1>
        <hr class="horizontal" />

        <section>
          <div class="about1">
            <video
              src={inboxvideo}
              muted
              loop
              autoplay
              class="inboxVideo1"
            ></video>
            <p class="inboxVideo-text">
              <b>Problem</b>
            </p>
            <p class="inboxVideo-text">
              Any local area problems can be directly sent to the MLAs and the
              respective authority
            </p>
          </div>
          <div class="about2">
            <video
              src={progresses}
              muted
              loop
              autoplay
              class="progress"
            ></video>
            <p class="progress-text">
              <b>Progress</b>
            </p>
            <p class="progress-text2">
              The MLAs can check the problem and forward them to respective
              position holders.
            </p>
          </div>
          <div class="about3">
            <video src={goal} muted loop autoplay class="goal"></video>
            <p class="goal-text">
              <b>Vision/Objective</b>
            </p>
            <p class="goal-text">
              Our vision is to ease the problem resolution to our users. Many
              people voices are unheard to the government so ,
              <span class="we">
                {' '}
                <b> WE ARE THE VOICE</b>
              </span>
            </p>
          </div>
        </section>
        <section>
          <div class="FAQ-div" id="FAQ">
            <div class="row-1">
              <h1 class="faq-head">
                <strong>FAQ</strong>
              </h1>
              <hr class="horizontal" />
              <h3 class="ques">
                How will the MLA know about the complaint/issue ?
              </h3>
              <p class="ans">
                Users will have to choose the category of the complaint and then
                select their local MLA.
              </p>
              <p>
                The users request can be directly sent to the MLA's chatroom and
                notifies him/her.
              </p>
              <hr class="horizontal" />

              <h3>
                Can the user upload photos and videos of their local problem ?
              </h3>
              <p>Yes, the user can upload photos/videos of their problem.</p>
              <p>
                This provides a clear view of the problem and the problem can be
                really felt.
              </p>
              <hr class="horizontal" />

              <h3>Who developed this Website?</h3>
              <p>
                The website had been developed as semester project by the
                students of
                <a class="faq-links" href="https://www.iiits.ac.in/">
                  IIIT Sricity
                </a>
                . A page has been dedicated to the wesite-developers , you can
                visit it{' '}
                <a class="faq-links" href="#about">
                  here
                </a>
                .
              </p>
              <hr class="horizontal" />

              <h3>What is the purpose of the website?</h3>
              <p>
                This website helps people to directly communicate their problem
                with the higher officials and get their problems resolved with
                ease and as fast as possible.
              </p>
              <hr class="horizontal" />

              <h3>
                How complicated are the steps that are to be followed to lodge a
                complaint?
              </h3>
              <p>
                All the website work is kept very basic and the developers
                ensured that the user will utilize the facility with ease.
              </p>
              <p>
                <a class="faq-links" href="#Top">
                  Login/Sign Up
                </a>{' '}
                Sort their problem upload all details about their problem
              </p>
              <hr class="horizontal" />

              <h3>How will the MLA login ?</h3>
              <p>
                Every MLA is given with unique token and he/she can login
                through it.
              </p>
            </div>
          </div>
        </section>
        <footer class="footer" id="footer">
          <div class="container">
            <div class="row">
              <div class="footer-col">
                <h4>Website Details</h4>
                <ul>
                  <li>
                    <a href="#about">about us</a>
                  </li>
                  <li>
                    <a href="#FAQ">FAQ</a>
                  </li>

                  <li>
                    <a href="#">profile</a>
                  </li>
                  <li>
                    <a href="#">Website-Developers</a>
                  </li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>About the Government</h4>
                <ul>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/constitution-india"
                      target="_blank"
                    >
                      Constitution of India
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/government-directory"
                      target="_blank"
                    >
                      Government Directory
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/indian-parliament"
                      target="_blank"
                    >
                      Indian Parliament
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/whos-who"
                      target="_blank"
                    >
                      Who's Who
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/whos-who/mlasmlcs"
                      target="_blank"
                    >
                      MLAs/MLCs
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/whos-who/president"
                      target="_blank"
                    >
                      President of India
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/whos-who/council-ministers"
                      target="_blank"
                    >
                      Cabinet Ministers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/whos-who/chiefs-armed-forces"
                      target="_blank"
                    >
                      Chiefs of Armed Forces
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.india.gov.in/my-government/whos-who/members-parliament"
                      target="_blank"
                    >
                      Members of Parliament
                    </a>
                  </li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>Services</h4>
                <ul>
                  <li>
                    <a href="#">Complaint lodging</a>
                  </li>
                  <li>
                    <a href="https://www.pmindia.gov.in/en/image-gallery/">
                      Gallery
                    </a>
                  </li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>follow us</h4>
                <div class="social-links">
                  <a href="#">
                    <i class="fab fa-facebook-f bhanufb"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-youtube bhanuyt"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-twitter bhanutw"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-instagram bhanuinsta"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-linkedin-in bhanuli"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div class="credit">
          Copyright 2022 Created By
          <a href="#">
            <span class="creators">IIITS STUDENTS</span>
          </a>{' '}
          all rights reserved !!
        </div>
      </div>
    </>
  );
}

export default Homee;
