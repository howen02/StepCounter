import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  } from "react-native-health";
import { useEffect, useState } from 'react';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

const useHealthData = (date: Date) => {
    const [hasPermissions, setHasPermission] = useState(false);
    const [steps, setSteps] = useState(0);
    const [flights, setFlights] = useState(0);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        AppleHealthKit.initHealthKit(permissions, (err) => {
            if (err) {
                console.log("Error getting permissions");
                return;
            }
            setHasPermission(true);
        });
    }, []);

    useEffect(() => {
        if (!hasPermissions) {
            return;
        }

        const options: HealthInputOptions = {
            date: date.toISOString(),
            includeManuallyAdded: false,
        };

        AppleHealthKit.getStepCount(options, (err, results) => {
            if (err) {
                console.log("Error getting the steps");
                return;
            }

            setSteps(results.value);
        });

        AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
            if (err) {
                console.log("Error getting the distance", err);
                return;
            }

            setDistance(results.value);
        });

        AppleHealthKit.getFlightsClimbed(options, (err, results) => {
            if (err) {
                console.log("Error getting the flights", err);
                return;
            }

            setFlights(results.value);
        });
    }, [hasPermissions]);

    return {
      steps,
      flights, 
      distance,
    }
};

export default useHealthData
