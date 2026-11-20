// Généré par tools/build_pids.py — ne pas modifier à la main.
// Source : Auris_2017_Pids_metric.csv (zansprojects.blogspot.com), 212 codes.
window.AURIS_PIDS = [
 {
  "name": "State of Charge",
  "unit": "%",
  "header": "7E2",
  "pid": "015B",
  "eq": "A * 20 / 51",
  "rate": "fast"
 },
 {
  "name": "Ambient temperature",
  "unit": "°C",
  "header": "7E2",
  "pid": "2101",
  "eq": "D - 40",
  "rate": "fast"
 },
 {
  "name": "Accel Pedal Pos #1",
  "unit": "%",
  "header": "7E2",
  "pid": "2101",
  "eq": "M * 20 / 51",
  "rate": "fast"
 },
 {
  "name": "Accel Pedal Pos #2",
  "unit": "%",
  "header": "7E2",
  "pid": "2101",
  "eq": "N * 20 / 51",
  "rate": "fast"
 },
 {
  "name": "Atmosphere Pressure_7E2",
  "unit": "kPa",
  "header": "7E2",
  "pid": "2101",
  "eq": "E",
  "rate": "fast"
 },
 {
  "name": "Calculated Load_7E2",
  "unit": "%",
  "header": "7E2",
  "pid": "2101",
  "eq": "A * 20 / 51",
  "rate": "fast"
 },
 {
  "name": "DTC Clear Run Distance",
  "unit": "km",
  "header": "7E2",
  "pid": "2101",
  "eq": "P * 256 + Q",
  "rate": "fast"
 },
 {
  "name": "DTC Clear Min",
  "unit": "min",
  "header": "7E2",
  "pid": "2101",
  "eq": "R * 256 + S",
  "rate": "fast"
 },
 {
  "name": "DTC Clear Warm Up",
  "unit": "",
  "header": "7E2",
  "pid": "2101",
  "eq": "O",
  "rate": "fast"
 },
 {
  "name": "Intake Air Temperature_7E2",
  "unit": "°C",
  "header": "7E2",
  "pid": "2101",
  "eq": "C - 40",
  "rate": "fast"
 },
 {
  "name": "Engine run time",
  "unit": "s",
  "header": "7E2",
  "pid": "2101",
  "eq": "J * 256 + K",
  "rate": "fast"
 },
 {
  "name": "Vehicle Speed_7E2",
  "unit": "km/h",
  "header": "7E2",
  "pid": "2101",
  "eq": "I",
  "rate": "fast"
 },
 {
  "name": "Manifold Air Pressure_7E2",
  "unit": "kPa",
  "header": "7E2",
  "pid": "2101",
  "eq": "B",
  "rate": "fast"
 },
 {
  "name": "Engine Speed_7E2",
  "unit": "RPM",
  "header": "7E2",
  "pid": "2101",
  "eq": "(G * 256 + H) / 4",
  "rate": "fast"
 },
 {
  "name": "State of Charge (All Bat)",
  "unit": "%",
  "header": "7E2",
  "pid": "2101",
  "eq": "V * 20 / 51",
  "rate": "fast"
 },
 {
  "name": "Throttle Position",
  "unit": "%",
  "header": "7E2",
  "pid": "2101",
  "eq": "L * 20 / 51",
  "rate": "fast"
 },
 {
  "name": "Cancel Switch",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2121",
  "eq": "{E:2}",
  "rate": "slow"
 },
 {
  "name": "Cruise Control",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2121",
  "eq": "{D:6}",
  "rate": "slow"
 },
 {
  "name": "CCS Vehicle Spd",
  "unit": "km/h",
  "header": "7E2",
  "pid": "2121",
  "eq": "A",
  "rate": "slow"
 },
 {
  "name": "CCS Mem Vehicle Spd",
  "unit": "km/h",
  "header": "7E2",
  "pid": "2121",
  "eq": "B",
  "rate": "slow"
 },
 {
  "name": "Cruise Operation Status",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2121",
  "eq": "{D:7}",
  "rate": "slow"
 },
 {
  "name": "RES/ACC Switch",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2121",
  "eq": "{E:4}",
  "rate": "slow"
 },
 {
  "name": "SET/COAST Switch",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2121",
  "eq": "{E:3}",
  "rate": "slow"
 },
 {
  "name": "Auxiliary Battery Temperature",
  "unit": "°C",
  "header": "7E2",
  "pid": "2141",
  "eq": "E - 40",
  "rate": "fast"
 },
 {
  "name": "P Pos SW Terminal Vol",
  "unit": "V",
  "header": "7E2",
  "pid": "2141",
  "eq": "H * 79.9987793 / 255",
  "rate": "fast"
 },
 {
  "name": "Engine Rev (Sensor)",
  "unit": "RPM",
  "header": "7E2",
  "pid": "2141",
  "eq": "(F * 256 + G) / 4",
  "rate": "fast"
 },
 {
  "name": "Shift Sensor Main",
  "unit": "V",
  "header": "7E2",
  "pid": "2141",
  "eq": "A * 4.98 / 255",
  "rate": "fast"
 },
 {
  "name": "Shift Sensor Sub",
  "unit": "V",
  "header": "7E2",
  "pid": "2141",
  "eq": "B * 4.98 / 255",
  "rate": "fast"
 },
 {
  "name": "Shift Sensor Select Main",
  "unit": "V",
  "header": "7E2",
  "pid": "2141",
  "eq": "C * 4.98 / 255",
  "rate": "fast"
 },
 {
  "name": "Shift Sensor Select Sub",
  "unit": "V",
  "header": "7E2",
  "pid": "2141",
  "eq": "D * 4.98 / 255",
  "rate": "fast"
 },
 {
  "name": "MG1 revolution",
  "unit": "RPM",
  "header": "7E2",
  "pid": "2161",
  "eq": "D * 256 + E - 32768",
  "rate": "fast"
 },
 {
  "name": "MG1 temperature",
  "unit": "°C",
  "header": "7E2",
  "pid": "2161",
  "eq": "A - 40",
  "rate": "fast"
 },
 {
  "name": "MG1 temperature after IG-ON",
  "unit": "°C",
  "header": "7E2",
  "pid": "2161",
  "eq": "B - 40",
  "rate": "fast"
 },
 {
  "name": "MG1 temperature Max",
  "unit": "°C",
  "header": "7E2",
  "pid": "2161",
  "eq": "C - 40",
  "rate": "fast"
 },
 {
  "name": "MG2 revolution",
  "unit": "RPM",
  "header": "7E2",
  "pid": "2162",
  "eq": "D * 256 + E - 32768",
  "rate": "fast"
 },
 {
  "name": "MG2 temperature",
  "unit": "°C",
  "header": "7E2",
  "pid": "2162",
  "eq": "A - 40",
  "rate": "fast"
 },
 {
  "name": "MG2 temperature after IG-ON",
  "unit": "°C",
  "header": "7E2",
  "pid": "2162",
  "eq": "B - 40",
  "rate": "fast"
 },
 {
  "name": "MG2 temperature Max",
  "unit": "°C",
  "header": "7E2",
  "pid": "2162",
  "eq": "C - 40",
  "rate": "fast"
 },
 {
  "name": "MG1 torque execution value",
  "unit": "Nm",
  "header": "7E2",
  "pid": "2167",
  "eq": "(C * 256 + D) / 8 - 4096",
  "rate": "fast"
 },
 {
  "name": "MG1 Control Mode (PWM=0,Variable PWM=1,Rectangular wave=2)",
  "unit": "",
  "header": "7E2",
  "pid": "2167",
  "eq": "E",
  "rate": "fast"
 },
 {
  "name": "MG1 torque",
  "unit": "Nm",
  "header": "7E2",
  "pid": "2167",
  "eq": "(A * 256 + B) / 8 - 4096",
  "rate": "fast"
 },
 {
  "name": "MG2 torque execution value",
  "unit": "Nm",
  "header": "7E2",
  "pid": "2168",
  "eq": "(C * 256 + D) / 8 - 4096",
  "rate": "fast"
 },
 {
  "name": "MG2 Control Mode (PWM=0,Variable PWM=1,Rectangular wave=2)",
  "unit": "",
  "header": "7E2",
  "pid": "2168",
  "eq": "E",
  "rate": "fast"
 },
 {
  "name": "MG2 torque",
  "unit": "Nm",
  "header": "7E2",
  "pid": "2168",
  "eq": "(A * 256 + B) / 8 - 4096",
  "rate": "fast"
 },
 {
  "name": "Inverter MG1 Temp",
  "unit": "°C",
  "header": "7E2",
  "pid": "2170",
  "eq": "A - 40",
  "rate": "fast"
 },
 {
  "name": "Inverter MG1 Temp after IG-ON",
  "unit": "°C",
  "header": "7E2",
  "pid": "2170",
  "eq": "B - 40",
  "rate": "fast"
 },
 {
  "name": "Inverter MG1 Temp Max",
  "unit": "°C",
  "header": "7E2",
  "pid": "2170",
  "eq": "C - 40",
  "rate": "fast"
 },
 {
  "name": "MG1 Gate Status",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2170",
  "eq": "{D:7}",
  "rate": "fast"
 },
 {
  "name": "Inverter MG2 Temp",
  "unit": "°C",
  "header": "7E2",
  "pid": "2171",
  "eq": "A - 40",
  "rate": "fast"
 },
 {
  "name": "Inverter MG2 Temp after IG-ON",
  "unit": "°C",
  "header": "7E2",
  "pid": "2171",
  "eq": "B - 40",
  "rate": "fast"
 },
 {
  "name": "Inverter MG2 Temp Max",
  "unit": "°C",
  "header": "7E2",
  "pid": "2171",
  "eq": "C - 40",
  "rate": "fast"
 },
 {
  "name": "MG2 Gate Status",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2171",
  "eq": "{D:7}",
  "rate": "fast"
 },
 {
  "name": "Boost converter temperature after IG-ON",
  "unit": "°C",
  "header": "7E2",
  "pid": "2174",
  "eq": "C - 40",
  "rate": "fast"
 },
 {
  "name": "Boost converter temperature (lower)",
  "unit": "°C",
  "header": "7E2",
  "pid": "2174",
  "eq": "B - 40",
  "rate": "fast"
 },
 {
  "name": "Boost converter temperature Max",
  "unit": "°C",
  "header": "7E2",
  "pid": "2174",
  "eq": "D - 40",
  "rate": "fast"
 },
 {
  "name": "Boost converter temperature (upper)",
  "unit": "°C",
  "header": "7E2",
  "pid": "2174",
  "eq": "A - 40",
  "rate": "fast"
 },
 {
  "name": "Converter Gate Status",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2174",
  "eq": "{E:7}",
  "rate": "fast"
 },
 {
  "name": "Overvoltage Input to Converter",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2174",
  "eq": "{E:6}",
  "rate": "fast"
 },
 {
  "name": "Overvoltage Input to Inverter",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2174",
  "eq": "{E:5}",
  "rate": "fast"
 },
 {
  "name": "VH-Voltage after Boosting",
  "unit": "V",
  "header": "7E2",
  "pid": "2174",
  "eq": "(H * 256 + I) / 2",
  "rate": "fast"
 },
 {
  "name": "VL-Voltage before Boosting",
  "unit": "V",
  "header": "7E2",
  "pid": "2174",
  "eq": "(F * 256 + G) / 2",
  "rate": "fast"
 },
 {
  "name": "Aircon Gate Status",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2175",
  "eq": "{A:5}",
  "rate": "fast"
 },
 {
  "name": "Inverter Coolant Temp",
  "unit": "°C",
  "header": "7E2",
  "pid": "2175",
  "eq": "D - 40",
  "rate": "fast"
 },
 {
  "name": "Inverter Water Pump Revolution",
  "unit": "RPM",
  "header": "7E2",
  "pid": "2175",
  "eq": "B * 256 + C",
  "rate": "fast"
 },
 {
  "name": "Prohibit DC/DC converter signal",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2175",
  "eq": "{A:6}",
  "rate": "fast"
 },
 {
  "name": "Water Pump Running",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2175",
  "eq": "{A:4}",
  "rate": "fast"
 },
 {
  "name": "MG1 Inverter Fail",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2178",
  "eq": "{A:6}",
  "rate": "fast"
 },
 {
  "name": "MG1 Inverter Shutdown",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2178",
  "eq": "{A:7}",
  "rate": "fast"
 },
 {
  "name": "MG2 Inverter Fail",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2178",
  "eq": "{B:6}",
  "rate": "fast"
 },
 {
  "name": "MG2 Inverter Shutdown",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2178",
  "eq": "{B:7}",
  "rate": "fast"
 },
 {
  "name": "Converter Fail",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2179",
  "eq": "{D:6}",
  "rate": "fast"
 },
 {
  "name": "Converter Shutdown",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "2179",
  "eq": "{D:7}",
  "rate": "fast"
 },
 {
  "name": "DCDC Cnv Target Pulse Duty",
  "unit": "%",
  "header": "7E2",
  "pid": "2179",
  "eq": "(A * 256 + B) * 399.9 / 65535",
  "rate": "fast"
 },
 {
  "name": "Water Pump Run Control Duty",
  "unit": "%",
  "header": "7E2",
  "pid": "2179",
  "eq": "C * 6.25",
  "rate": "fast"
 },
 {
  "name": "MG1 Carrier Frequency",
  "unit": "kHz",
  "header": "7E2",
  "pid": "217C",
  "eq": "A / 20",
  "rate": "fast"
 },
 {
  "name": "MG2 Carrier Frequency",
  "unit": "kHz",
  "header": "7E2",
  "pid": "217C",
  "eq": "B / 20",
  "rate": "fast"
 },
 {
  "name": "A/C consumption power",
  "unit": "W",
  "header": "7E2",
  "pid": "217D",
  "eq": "C * 50",
  "rate": "fast"
 },
 {
  "name": "Boost Ratio",
  "unit": "%",
  "header": "7E2",
  "pid": "217D",
  "eq": "A / 2",
  "rate": "fast"
 },
 {
  "name": "Converter Carrier Frequency (9.55kHz=0,9.13kHz=1,8.71kHz=2,8.29kHz=3,7.87kHz=4,7.45kHz=5,4.8kHz=6)",
  "unit": "",
  "header": "7E2",
  "pid": "217D",
  "eq": "B",
  "rate": "fast"
 },
 {
  "name": "Auxiliary Battery Voltage",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(AC * 256 + AD) * 79.9 / 65535 - 40",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V01",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(A * 256 + B) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V02",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(C * 256 + D) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V03",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(E * 256 + F) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V04",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(G * 256 + H) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V05",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(I * 256 + J) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V06",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(K * 256 + L) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V07",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(M * 256 + N) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V08",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(O * 256 + P) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V09",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(Q * 256 + R) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V10",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(S * 256 + T) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V11",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(U * 256 + V) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V12",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(W * 256 + X) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V13",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(Y * 256 + Z) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery Block Voltage -V14",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(AA * 256 + AB) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Power Resource VB",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "(AE * 256 + AF) / 10",
  "rate": "fast"
 },
 {
  "name": "VMF Fan Motor Voltage1",
  "unit": "V",
  "header": "7E2",
  "pid": "2181",
  "eq": "AG / 10",
  "rate": "fast"
 },
 {
  "name": "Temp of Batt TB1",
  "unit": "°C",
  "header": "7E2",
  "pid": "2187",
  "eq": "(C * 256 + D) * 255.9 / 65535 - 50",
  "rate": "fast"
 },
 {
  "name": "Temp of Batt TB2",
  "unit": "°C",
  "header": "7E2",
  "pid": "2187",
  "eq": "(E * 256 + F) * 255.9 / 65535 - 50",
  "rate": "fast"
 },
 {
  "name": "Temp of Batt TB3",
  "unit": "°C",
  "header": "7E2",
  "pid": "2187",
  "eq": "(G * 256 + H) * 255.9 / 65535 - 50",
  "rate": "fast"
 },
 {
  "name": "HV battery intake air temperature",
  "unit": "°C",
  "header": "7E2",
  "pid": "2187",
  "eq": "(A * 256 + B) * 255.9 / 65535 - 50",
  "rate": "fast"
 },
 {
  "name": "Power Resource IB",
  "unit": "A",
  "header": "7E2",
  "pid": "218A",
  "eq": "(A * 256 + B) / 100 - 327.68",
  "rate": "fast"
 },
 {
  "name": "Cooling Fan 0",
  "unit": "%",
  "header": "7E2",
  "pid": "218E",
  "eq": "A / 2",
  "rate": "fast"
 },
 {
  "name": "Cooling Fan Relay Status",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "218E",
  "eq": "{B:7}",
  "rate": "fast"
 },
 {
  "name": "Number of battery blocks",
  "unit": "",
  "header": "7E2",
  "pid": "2192",
  "eq": "G",
  "rate": "fast"
 },
 {
  "name": "Battery block number with maximum voltage",
  "unit": "",
  "header": "7E2",
  "pid": "2192",
  "eq": "F + 1",
  "rate": "fast"
 },
 {
  "name": "Battery block number with minimum voltage",
  "unit": "",
  "header": "7E2",
  "pid": "2192",
  "eq": "C + 1",
  "rate": "fast"
 },
 {
  "name": "Accumulated Time of DC Inhibit",
  "unit": "",
  "header": "7E2",
  "pid": "2192",
  "eq": "J * 256 + K",
  "rate": "fast"
 },
 {
  "name": "Accumulated Time of Battery too High",
  "unit": "",
  "header": "7E2",
  "pid": "2192",
  "eq": "L * 256 + M",
  "rate": "fast"
 },
 {
  "name": "Accumulated Time of Hot Temperature",
  "unit": "",
  "header": "7E2",
  "pid": "2192",
  "eq": "N * 256 + O",
  "rate": "fast"
 },
 {
  "name": "Accumulated Time of Battery Low",
  "unit": "",
  "header": "7E2",
  "pid": "2192",
  "eq": "H * 256 + I",
  "rate": "fast"
 },
 {
  "name": "Battery block maximum voltage",
  "unit": "V",
  "header": "7E2",
  "pid": "2192",
  "eq": "(D * 256 + E) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Difference between maximum & minimum voltage",
  "unit": "V",
  "header": "7E2",
  "pid": "2192",
  "eq": "((D - A) * 256 + E - B) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Battery block minimum voltage",
  "unit": "V",
  "header": "7E2",
  "pid": "2192",
  "eq": "(A * 256 + B) * 79.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R01",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "A / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R02",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "B / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R03",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "C / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R04",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "D / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R05",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "E / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R06",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "F / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R07",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "G / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R08",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "H / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R09",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "I / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R10",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "J / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R11",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "K / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R12",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "L / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R13",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "M / 1000",
  "rate": "fast"
 },
 {
  "name": "Internal Resistance R14",
  "unit": "ohm",
  "header": "7E2",
  "pid": "2195",
  "eq": "N / 1000",
  "rate": "fast"
 },
 {
  "name": "Batt Pack Current Val",
  "unit": "A",
  "header": "7E2",
  "pid": "2198",
  "eq": "(A * 256 + B) / 100 - 327.68",
  "rate": "fast"
 },
 {
  "name": "HV battery charge control",
  "unit": "kW",
  "header": "7E2",
  "pid": "2198",
  "eq": "C / 2 - 64",
  "rate": "fast"
 },
 {
  "name": "Delta SOC",
  "unit": "%",
  "header": "7E2",
  "pid": "2198",
  "eq": "E / 2",
  "rate": "fast"
 },
 {
  "name": "HV battery discharge control",
  "unit": "kW",
  "header": "7E2",
  "pid": "2198",
  "eq": "D / 2 - 64",
  "rate": "fast"
 },
 {
  "name": "SOC after IG-ON",
  "unit": "%",
  "header": "7E2",
  "pid": "2198",
  "eq": "F / 2",
  "rate": "fast"
 },
 {
  "name": "SOC Max",
  "unit": "%",
  "header": "7E2",
  "pid": "2198",
  "eq": "G / 2",
  "rate": "fast"
 },
 {
  "name": "SOC Min",
  "unit": "%",
  "header": "7E2",
  "pid": "2198",
  "eq": "H / 2",
  "rate": "fast"
 },
 {
  "name": "ECU Control Mode (Driving control mode=1,Current sensor offset mode=2,External charge control mode=3,Power supply end mode=4)",
  "unit": "",
  "header": "7E2",
  "pid": "219B",
  "eq": "A",
  "rate": "fast"
 },
 {
  "name": "Cooling Fan Mode 1",
  "unit": "",
  "header": "7E2",
  "pid": "219B",
  "eq": "B",
  "rate": "fast"
 },
 {
  "name": "Short Circuit Wave Highest Value",
  "unit": "V",
  "header": "7E2",
  "pid": "219B",
  "eq": "D * 4.98 / 255",
  "rate": "fast"
 },
 {
  "name": "Standby Blower Request Status",
  "unit": "Off/On",
  "header": "7E2",
  "pid": "219B",
  "eq": "{C:7}",
  "rate": "fast"
 },
 {
  "name": "Destination (America=A=65)",
  "unit": "",
  "header": "7E2",
  "pid": "21C1",
  "eq": "P",
  "rate": "once"
 },
 {
  "name": "Model Code_7E2",
  "unit": "",
  "header": "7E2",
  "pid": "21C1",
  "eq": "ABCDEFG",
  "rate": "once"
 },
 {
  "name": "ECU Code",
  "unit": "",
  "header": "7E2",
  "pid": "21C2",
  "eq": "ABCDE",
  "rate": "once"
 },
 {
  "name": "Number of Current Code",
  "unit": "",
  "header": "7E2",
  "pid": "21E1",
  "eq": "A",
  "rate": "slow"
 },
 {
  "name": "Number of History Code",
  "unit": "",
  "header": "7E2",
  "pid": "21E1",
  "eq": "B",
  "rate": "slow"
 },
 {
  "name": "Atmosphere Pressure_7E0",
  "unit": "kPa",
  "header": "7E0",
  "pid": "2101",
  "eq": "H",
  "rate": "fast"
 },
 {
  "name": "Calculated Load_7E0",
  "unit": "%",
  "header": "7E0",
  "pid": "2101",
  "eq": "A * 20 / 51",
  "rate": "fast"
 },
 {
  "name": "Coolant Temperature_7E0",
  "unit": "°C",
  "header": "7E0",
  "pid": "2101",
  "eq": "I - 40",
  "rate": "fast"
 },
 {
  "name": "Intake Air Temperature_7E0",
  "unit": "°C",
  "header": "7E0",
  "pid": "2101",
  "eq": "G - 40",
  "rate": "fast"
 },
 {
  "name": "Engine Run Time (Time since Ign-On)",
  "unit": "s",
  "header": "7E0",
  "pid": "2101",
  "eq": "M * 256 + N",
  "rate": "fast"
 },
 {
  "name": "Vehicle Speed_7E0",
  "unit": "km/h",
  "header": "7E0",
  "pid": "2101",
  "eq": "L",
  "rate": "fast"
 },
 {
  "name": "Mass Air Flow",
  "unit": "g/s",
  "header": "7E0",
  "pid": "2101",
  "eq": "(D * 256 + E) / 100",
  "rate": "fast"
 },
 {
  "name": "Manifold Air Pressure_7E0",
  "unit": "kPa",
  "header": "7E0",
  "pid": "2101",
  "eq": "F",
  "rate": "fast"
 },
 {
  "name": "Engine Speed_7E0",
  "unit": "RPM",
  "header": "7E0",
  "pid": "2101",
  "eq": "(J * 256 + K) / 4",
  "rate": "fast"
 },
 {
  "name": "Vehicle Load",
  "unit": "%",
  "header": "7E0",
  "pid": "2101",
  "eq": "(B * 256 + C) * 100 / 65535",
  "rate": "fast"
 },
 {
  "name": "Fuel System Status #1 (OL=1,CL=2,OLDrive=4,OLFault=8,CLFault=16)",
  "unit": "",
  "header": "7E0",
  "pid": "2103",
  "eq": "A",
  "rate": "fast"
 },
 {
  "name": "IGN Advance",
  "unit": "deg",
  "header": "7E0",
  "pid": "2103",
  "eq": "E / 2 - 64",
  "rate": "fast"
 },
 {
  "name": "Long FT #1",
  "unit": "%",
  "header": "7E0",
  "pid": "2103",
  "eq": "D * 199.2 / 255 - 100",
  "rate": "fast"
 },
 {
  "name": "Short FT #1",
  "unit": "%",
  "header": "7E0",
  "pid": "2103",
  "eq": "C * 199.2 / 255 - 100",
  "rate": "fast"
 },
 {
  "name": "AF Lambda B1S1",
  "unit": "",
  "header": "7E0",
  "pid": "2104",
  "eq": "(C * 256 + D) * 1.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "AFS Voltage B1S1",
  "unit": "V",
  "header": "7E0",
  "pid": "2104",
  "eq": "(E * 256 + F) * 7.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "Target Air-Fuel Ratio",
  "unit": "",
  "header": "7E0",
  "pid": "2104",
  "eq": "(A * 256 + B) * 1.99 / 65535",
  "rate": "fast"
 },
 {
  "name": "MIL",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2106",
  "eq": "{A:7}",
  "rate": "slow"
 },
 {
  "name": "Comm with Air Conditioner",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2124",
  "eq": "{A:2}",
  "rate": "slow"
 },
 {
  "name": "Communication with Brake",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2124",
  "eq": "{A:3}",
  "rate": "slow"
 },
 {
  "name": "Communication with HV",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2124",
  "eq": "{A:5}",
  "rate": "slow"
 },
 {
  "name": "Initial Engine Coolant Temp",
  "unit": "°C",
  "header": "7E0",
  "pid": "2137",
  "eq": "A * 159.3 / 255 - 40",
  "rate": "slow"
 },
 {
  "name": "Initial Intake Air Temp",
  "unit": "°C",
  "header": "7E0",
  "pid": "2137",
  "eq": "B * 159.3 / 255 - 40",
  "rate": "slow"
 },
 {
  "name": "Injection duration for cylinder 1",
  "unit": "µs",
  "header": "7E0",
  "pid": "213C",
  "eq": "C * 256 + D",
  "rate": "fast"
 },
 {
  "name": "Injection volume (Cylinder 1) for 10 times",
  "unit": "ml",
  "header": "7E0",
  "pid": "213C",
  "eq": "(A * 256 + B) * 2.047 / 65535",
  "rate": "fast"
 },
 {
  "name": "Total FT #1",
  "unit": "",
  "header": "7E0",
  "pid": "213C",
  "eq": "E * 0.996 / 255 - 0.5",
  "rate": "fast"
 },
 {
  "name": "VVT Aim Angle #1",
  "unit": "%",
  "header": "7E0",
  "pid": "2144",
  "eq": "(A * 256 + B) * 399.9 / 65535",
  "rate": "fast"
 },
 {
  "name": "VVT Change Angle #1",
  "unit": "DegFR",
  "header": "7E0",
  "pid": "2144",
  "eq": "(E * 256 + F) * 639.9 / 65535",
  "rate": "fast"
 },
 {
  "name": "VVT OCV Duty #1",
  "unit": "%",
  "header": "7E0",
  "pid": "2144",
  "eq": "(C * 256 + D) * 399.9 / 65535",
  "rate": "fast"
 },
 {
  "name": "Ignition Trig. Count",
  "unit": "",
  "header": "7E0",
  "pid": "2145",
  "eq": "I * 256 + J",
  "rate": "fast"
 },
 {
  "name": "Cylinder #1 Misfire Count",
  "unit": "",
  "header": "7E0",
  "pid": "2145",
  "eq": "D",
  "rate": "fast"
 },
 {
  "name": "Cylinder #2 Misfire Count",
  "unit": "",
  "header": "7E0",
  "pid": "2145",
  "eq": "E",
  "rate": "fast"
 },
 {
  "name": "Cylinder #3 Misfire Count",
  "unit": "",
  "header": "7E0",
  "pid": "2145",
  "eq": "F",
  "rate": "fast"
 },
 {
  "name": "Cylinder #4 Misfire Count",
  "unit": "",
  "header": "7E0",
  "pid": "2145",
  "eq": "G",
  "rate": "fast"
 },
 {
  "name": "All Cylinders Misfire Count",
  "unit": "",
  "header": "7E0",
  "pid": "2145",
  "eq": "H",
  "rate": "fast"
 },
 {
  "name": "Misfire Load",
  "unit": "g/1",
  "header": "7E0",
  "pid": "2145",
  "eq": "C * 3.98 / 255",
  "rate": "fast"
 },
 {
  "name": "Misfire RPM",
  "unit": "RPM",
  "header": "7E0",
  "pid": "2145",
  "eq": "B * 25",
  "rate": "fast"
 },
 {
  "name": "EGR Step Position",
  "unit": "step",
  "header": "7E0",
  "pid": "2147",
  "eq": "A",
  "rate": "fast"
 },
 {
  "name": "Actual Engine Torque",
  "unit": "Nm",
  "header": "7E0",
  "pid": "2149",
  "eq": "(D * 256 + E) - 32768",
  "rate": "fast"
 },
 {
  "name": "Engine Independent",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2149",
  "eq": "{L:4}",
  "rate": "fast"
 },
 {
  "name": "Engine Independent Control",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2149",
  "eq": "{L:7}",
  "rate": "fast"
 },
 {
  "name": "F/C for Engine Stop Req",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2149",
  "eq": "{L:3}",
  "rate": "fast"
 },
 {
  "name": "Engine Run Time (Up to 255 sec. only)",
  "unit": "s",
  "header": "7E0",
  "pid": "2149",
  "eq": "F",
  "rate": "fast"
 },
 {
  "name": "ISC Learning",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2149",
  "eq": "{L:2}",
  "rate": "fast"
 },
 {
  "name": "ISC Learning Value",
  "unit": "L/s",
  "header": "7E0",
  "pid": "2149",
  "eq": "(J * 256 + K) * 79.998 / 65535",
  "rate": "fast"
 },
 {
  "name": "Judge Time Engine Ignition",
  "unit": "s",
  "header": "7E0",
  "pid": "2149",
  "eq": "H / 10",
  "rate": "fast"
 },
 {
  "name": "Judge Time Engine Output",
  "unit": "s",
  "header": "7E0",
  "pid": "2149",
  "eq": "I / 10",
  "rate": "fast"
 },
 {
  "name": "Racing Operation",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2149",
  "eq": "{L:5}",
  "rate": "fast"
 },
 {
  "name": "Request Engine Run Time",
  "unit": "s",
  "header": "7E0",
  "pid": "2149",
  "eq": "G / 10",
  "rate": "fast"
 },
 {
  "name": "Requested Engine Torque",
  "unit": "kW",
  "header": "7E0",
  "pid": "2149",
  "eq": "(A * 256 + B) / 4",
  "rate": "fast"
 },
 {
  "name": "HV Target Engine Speed",
  "unit": "RPM",
  "header": "7E0",
  "pid": "2149",
  "eq": "C * 25",
  "rate": "fast"
 },
 {
  "name": "Request Warm-up",
  "unit": "Off/On",
  "header": "7E0",
  "pid": "2149",
  "eq": "{L:6}",
  "rate": "fast"
 },
 {
  "name": "Engine Speed of Cyl #1 (51199 rpm: Active Test not performed)",
  "unit": "RPM",
  "header": "7E0",
  "pid": "2154",
  "eq": "(A * 256 + B) * 51199 / 65535",
  "rate": "slow"
 },
 {
  "name": "Engine Speed of Cyl #2 (51199 rpm: Active Test not performed)",
  "unit": "RPM",
  "header": "7E0",
  "pid": "2154",
  "eq": "(C * 256 + D) * 51199 / 65535",
  "rate": "slow"
 },
 {
  "name": "Engine Speed of Cyl #3 (51199 rpm: Active Test not performed)",
  "unit": "RPM",
  "header": "7E0",
  "pid": "2154",
  "eq": "(E * 256 + F) * 51199 / 65535",
  "rate": "slow"
 },
 {
  "name": "Engine Speed of Cyl #4 (51199 rpm: Active Test not performed)",
  "unit": "RPM",
  "header": "7E0",
  "pid": "2154",
  "eq": "(G * 256 + H) * 51199 / 65535",
  "rate": "slow"
 },
 {
  "name": "Av Engine Speed of All Cyl (51199 rpm: Active Test not performed)",
  "unit": "RPM",
  "header": "7E0",
  "pid": "2154",
  "eq": "(I * 256 + J) * 51199 / 65535",
  "rate": "slow"
 },
 {
  "name": "Cylinder Number",
  "unit": "",
  "header": "7E0",
  "pid": "21C1",
  "eq": "N",
  "rate": "once"
 },
 {
  "name": "Destination",
  "unit": "",
  "header": "7E0",
  "pid": "21C1",
  "eq": "P",
  "rate": "once"
 },
 {
  "name": "Engine Type",
  "unit": "",
  "header": "7E0",
  "pid": "21C1",
  "eq": "HIJKLM",
  "rate": "once"
 },
 {
  "name": "Model Code_7E0",
  "unit": "",
  "header": "7E0",
  "pid": "21C1",
  "eq": "ABCDEFG",
  "rate": "once"
 },
 {
  "name": "Model Year",
  "unit": "",
  "header": "7E0",
  "pid": "21C1",
  "eq": "Q + 1900",
  "rate": "once"
 },
 {
  "name": "System Identification",
  "unit": "",
  "header": "7E0",
  "pid": "21C1",
  "eq": "R",
  "rate": "once"
 },
 {
  "name": "Wheel Cylinder Pressure Sensor",
  "unit": "V",
  "header": "7B0",
  "pid": "2107",
  "eq": "A / 51",
  "rate": "fast"
 },
 {
  "name": "Inspection Mode (Other=Off,Inspect=On)",
  "unit": "Off/On",
  "header": "7B0",
  "pid": "21A6",
  "eq": "{A:7}",
  "rate": "slow"
 },
 {
  "name": "Distance Since Oil Change for U.S.A. (reset)",
  "unit": "km",
  "header": "7C0",
  "pid": "2141",
  "eq": "A * 2514600 / 15625",
  "rate": "slow"
 },
 {
  "name": "Seat Belt Beep Query (Dis A=0,Ena R=32,Ena P=64,Dis D=96,Ena D=128,Dis P=160,192=Dis R,Ena A=160)",
  "unit": "",
  "header": "7C0",
  "pid": "21A7",
  "eq": "A",
  "rate": "slow"
 },
 {
  "name": "Adjusted Ambient Temp",
  "unit": "°C",
  "header": "7C4",
  "pid": "213D",
  "eq": "A * 81.6 / 255 - 30.8",
  "rate": "slow"
 },
 {
  "name": "Battery Power",
  "unit": "kW",
  "header": "",
  "pid": "",
  "eq": "VAL{Auris-Batt Pack Current Val} * VAL{Auris-VL-Voltage before Boosting} / 1000.0",
  "rate": "calc"
 }
];
