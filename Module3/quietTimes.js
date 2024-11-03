async function activityTable(day) {
  // Read the list of log files from the main log file
  const logFileList = await textFile("camera_logs.txt");
  const fileNames = logFileList.split("\n");
  const hourCounts = Array(24).fill(0); // Initialize an array for 24 hours

  // Loop through each log file
  for (const fileName of fileNames) {
      const logContent = await textFile(fileName);
      const timestamps = logContent.split("\n").map(Number);

      // Count activities for each timestamp
      timestamps.forEach(timestamp => {
          const date = new Date(timestamp);
          if (date.getDay() === day) {
              hourCounts[date.getHours()]++; // Increment the corresponding hour
          }
      });
  }

  return hourCounts; // Return the count array
}
