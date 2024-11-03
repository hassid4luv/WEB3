function activityTable(day) {
  return textFile("camera_logs.txt").then(logFileList => {
      const fileNames = logFileList.split("\n");
      const hourCounts = Array(24).fill(0); // Initialize an array for 24 hours

      // Create an array of Promises to read all log files
      const promises = fileNames.map(fileName => {
          return textFile(fileName).then(logContent => {
              const timestamps = logContent.split("\n").map(Number);

              // Count activities for each timestamp
              timestamps.forEach(timestamp => {
                  const date = new Date(timestamp);
                  if (date.getDay() === day) {
                      hourCounts[date.getHours()]++; // Increment the corresponding hour
                  }
              });
          });
      });

      // Wait for all file reads to complete
      return Promise.all(promises).then(() => hourCounts); // Return the count array
  });
}
