import React from 'react';
import Header from './Header';

function ProgrammesPage() {
  return (
    <div>
      <Header />
      <div className="programs">
        <div className="shortdescription">
          <h4>Our Programs</h4>
          <p>
            We offer comprehensive programs designed to meet each child's unique needs and support their journey toward healing and growth.
          </p>
        </div>

        {/* Education */}
        <div className="education">
          <div className="heading1">
            <img src="https://img.icons8.com/?size=50&id=41414&format=png" alt="Education Icon" />
            <h4>Education</h4>
          </div>
          <div className="heading2">
            <div className="subheading2">
              <p>We offer comprehensive educational programs, tutoring, and academic support for all ages.</p>
              <ul>
                <li>Academic tutoring</li>
                <li>Life skills training</li>
                <li>Vocational programs</li>
                <li>College prep</li>
              </ul>
            </div>
            <img
              src="https://images.unsplash.com/photo-1607823477522-177cff8183d1?w=500&auto=format&fit=crop&q=60"
              alt="Children reading books"
            />
          </div>
        </div>

        {/* Nutrition */}
        <div className="nutrition">
          <div className="heading1">
            <img src="https://img.icons8.com/?size=50&id=9731&format=png" alt="Nutrition Icon" />
            <h4>Nutrition & Health</h4>
          </div>
          <div className="heading2">
            <div className="subheading2">
              <p>Our Health & Nutrition Program ensures that every child receives balanced meals and proper healthcare.</p>
              <p>This program supports physical and mental development in a safe and nurturing environment.</p>
              <p>It includes:</p>
              <ul>
                <li>Regular health checkups</li>
                <li>Nutritious meal planning</li>
                <li>Growth monitoring</li>
                <li>Education on healthy habits</li>
              </ul>
            </div>
            <img
              src="https://plus.unsplash.com/premium_photo-1661265882566-3138962f933d?w=500&auto=format&fit=crop&q=60"
              alt="Health care"
            />
          </div>
        </div>

        {/* Family Reunification */}
        <div className="family">
          <div className="heading1">
            <img src="https://img.icons8.com/?size=50&id=8902&format=png" alt="Family Icon" />
            <h4>Family Reunification</h4>
          </div>
          <div className="heading2">
            <div className="subheading2">
              <p>We support families to safely reunite when possible, with ongoing support services.</p>
              <p>Our team works with children and their families to rebuild relationships and provide a stable home environment.</p>
              <p>Key activities include:</p>
              <ul>
                <li>Family assessment</li>
                <li>Parent support & counselling</li>
                <li>Supervised visits</li>
                <li>Child preparation</li>
              </ul>
            </div>
            <img
              src="https://images.unsplash.com/photo-1529180979161-06b8b6d6f2be?w=500&auto=format&fit=crop&q=60"
              alt="Family Reunification"
            />
          </div>
        </div>

        {/* Counseling */}
        <div className="guidance">
          <div className="heading1">
            <img src="https://img.icons8.com/?size=80&id=AM5Js7op4Qct&format=png" alt="Guidance Icon" />
            <h4>Counseling and Guidance</h4>
          </div>
          <div className="heading2">
            <div className="subheading2">
              <p>Connect with licensed mental health professionals who specialize in supporting children and families.</p>
              <p>Our comprehensive counseling program provides expert care when it's needed most.</p>
              <p>Support areas include:</p>
              <ul>
                <li>Conflict resolution</li>
                <li>Personal development</li>
                <li>Life skills training</li>
                <li>Emotional healing</li>
              </ul>
            </div>
            <img
              src="https://media.istockphoto.com/id/2118396569/photo/childrens-counselling-session.webp?a=1&b=1&s=612x612&w=0&k=20&c=3A_ft3vzA69O-ZuoTnAPQJow0GTZni77UlyhVUoWH2s="
              alt="Counseling"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgrammesPage;
