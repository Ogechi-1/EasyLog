# File path: main.py

from microdot import Microdot, Response  # type: ignore
from machine import Pin, SPI
from adafruit_max31855 import MAX31855
import time

# Initialize the Microdot app
app = Microdot()

# Set up SPI communication in MicroPython
spi = SPI(1, baudrate=5000000, polarity=0, phase=0, sck=Pin(10), mosi=None, miso=Pin(12))  # Adjust these pins as needed
cs = Pin(11, Pin.OUT)  # Chip Select on GP11

# Initialize the MAX31855 sensor
sensor = MAX31855(spi, cs)

@app.route('/api/sensor-data')
def sensor_data(request):
    try:
        temp = sensor.temperature  # Using the 'temperature' attribute in MAX31855
        data = {
            "temperature": temp,
            "timestamp": time.time(),
            "unit": "Celsius"
        }
    except Exception as e:
        data = {
            "error": str(e),
            "temperature": None,
            "timestamp": time.time(),
            "unit": "Celsius"
        }
    return Response.json(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
