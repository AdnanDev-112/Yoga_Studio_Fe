import React from 'react';

const User_Schedule = () => {
  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [date, day] = formattedDate.split(', ');

  // Sample schedule data
  const scheduleData = [
    { classes: 'Yoga', activity: 'Hatha Yoga Class', time: '9:00 AM to 11:00 AM', instructor: 'John Doe', zoomLink: 'zoomlink1' },
    { classes: 'Yoga', activity: 'Vinyasa Flow', time: '11:00 AM to 1:00 PM', instructor: 'Jane Smith', zoomLink: 'zoomlink2' },
    { classes: 'Pilates', activity: 'Mat Pilates', time: '2:00 PM to 4:00 PM', instructor: 'Emily Johnson', zoomLink: 'zoomlink3' },
    { classes: 'Zumba', activity: 'Zumba Fitness', time: '5:00 PM to 7:00 PM', instructor: 'David Brown', zoomLink: 'zoomlink4' },
    { classes: 'Boxing', activity: 'Cardio Boxing', time: '7:00 AM to 9:00 AM', instructor: 'Michael Johnson', zoomLink: 'zoomlink5' },
    { classes: 'Pilates', activity: 'Reformer Pilates', time: '10:00 AM to 12:00 PM', instructor: 'Sarah Adams', zoomLink: 'zoomlink6' },
    { classes: 'Spinning', activity: 'Indoor Cycling', time: '1:00 PM to 3:00 PM', instructor: 'Alex Clark', zoomLink: 'zoomlink7' },
    { classes: 'Dance', activity: 'Hip-Hop Dance', time: '4:00 PM to 6:00 PM', instructor: 'Jessica White', zoomLink: 'zoomlink8' },
    { classes: 'Meditation', activity: 'Guided Meditation', time: '6:00 PM to 8:00 PM', instructor: 'Sophia Taylor', zoomLink: 'zoomlink9' },
    // Add more schedule items as needed
  ];

  return (
    <div>
      <h2>Today's Schedule - {formattedDate}</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={styles.th}>Classes</th>
            <th style={styles.th}>Activity</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Instructor</th>
            <th style={styles.th}>Online Class Option</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>{item.classes}</td>
              <td style={styles.td}>{item.activity}</td>
              <td style={styles.td}>{item.time}</td>
              <td style={styles.td}>{item.instructor}</td>
              <td style={styles.td}>{item.zoomLink}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
  td: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
};

export default User_Schedule;