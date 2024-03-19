import React from 'react';

const Studio_Insights = () => {
  // Sample data for studio insights
  const insightsData = {
    totalClasses: 25,
    totalAttendance: 480,
    revenue: 2500, // in dollars
    // Add more insights as needed
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Studio Insights</h2>
      <div style={styles.insightContainer}>
        <div style={styles.insight}>
          <h3>Total Classes</h3>
          <p style={styles.value}>{insightsData.totalClasses}</p>
        </div>
        <div style={styles.insight}>
          <h3>Total Attendance</h3>
          <p style={styles.value}>{insightsData.totalAttendance}</p>
        </div>
        <div style={styles.insight}>
          <h3>Revenue</h3>
          <p style={styles.value}>${insightsData.revenue}</p>
        </div>
      </div>
      {/* Add more insights here */}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  insightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  insight: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  value: {
    margin: '0',
    fontWeight: 'bold',
  },
};

export default Studio_Insights;
