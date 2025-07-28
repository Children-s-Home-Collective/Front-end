import React from 'react'
import Header from './Header'

function VolunteerPage() {
  return (
    <div className='volunteer'>
         <Header />
         <div className='volunteerbox'>
              <div className='volunteerleft'>
                <p>The children’s Home collective offers numerous opportunities for you to join us in helping children thrive. We welcome volunteers who are passionate about working with children and serving the community. The impact volunteers have on the various children’s home is invaluable. The positive interactions that volunteers offer help the children to thrive better and bring joy into their lives. We deeply appreciate all of our volunteers and their efforts.</p>
                <h3>How to volunteer</h3>
                <p>Volunteer opportunities vary in time requirements and length commitments.Most of our volunteer openings are fulfilled during regular business hours,Monday to Friday,8 a.m until 5p.m and some at weekends. We have modest accommodations for international volunteers as well, you could be on leave or on a school break and would love to take time to volunteer with us.</p>
                <p>There are some instances, such as special events, birthday parties and toy drives, which may be scheduled during weekend or evening hours.</p>
                <ol>
                    <li>Loving & caring for the babies</li>
                    <li>Offer mentorship programs</li>
                    <li>Play games </li>
                    <li>Share your special talents with the kids</li>
                    <li>Tutor the children </li>
                    <li>Work in our health care facilities</li>
                    <li> Help in construction works</li>
                </ol>
                <p>We encourage companies, churches and other organized groups to volunteer and interact with the children</p>
              </div>
              <div className='volunteerright'>
                <div className='notice'><p>Get started now</p></div>
                <p>Please fill the form below to volunteer with Children’s home collective </p>
                <form>
                    <input type="text" placeholder='name' />
                    <input type="text" placeholder='telephone number' />
                    <input type="text" placeholder='email' />
                    <input type="text" className='last2'placeholder='Childrens home  to volunteer'/>
                    <input type="text" className='last'placeholder='Area  to volunteer in'/>
                </form>
                <button>Volunteer now</button>
              </div>
         </div>
    </div>
  )
}

export default VolunteerPage