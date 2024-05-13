#define IR_PIN 13 
#define LED_PIN 12 
#define GREEN 14
#define RESET 2

unsigned long startTime = 0;        
unsigned long ledOnTime = 0;     
unsigned long ledOffTime = 0;
unsigned long totalLedOnTime = 0;   
bool ledState = LOW;                

void setup() {
  Serial.begin(9600);
  pinMode(IR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(RESET, INPUT_PULLUP); 
  digitalWrite(LED_PIN, LOW);
  digitalWrite(GREEN, LOW);
  resetState(); 
}

void resetState() {
  startTime = millis(); 
  totalLedOnTime = 0;  
  ledState = LOW;
  digitalWrite(LED_PIN, LOW);
  digitalWrite(GREEN, LOW);
}

void loop() {
  if (millis() - startTime >= 10000) {
    float ledOffTime = 10.0 - totalLedOnTime / 1000.0;
    Serial.print("Tiempo total LED encendido: ");
    Serial.print(ledOffTime); 
    Serial.println(" segundos");
    while (1) {
      digitalWrite(LED_PIN, LOW);
      digitalWrite(GREEN, LOW);
      if(digitalRead(RESET) == HIGH){
        resetState();
        break;
      }
    }
  }

  int irValue = digitalRead(IR_PIN);
  if (irValue == LOW && ledState == HIGH) { 
    // Apagar el LED
    digitalWrite(LED_PIN, LOW);
    digitalWrite(GREEN, HIGH);
    ledState = LOW;
    ledOffTime = millis();  
    totalLedOnTime += (ledOffTime - ledOnTime); 
  } else if (irValue == HIGH && ledState == LOW) {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(GREEN, LOW);
    ledState = HIGH;
    ledOnTime = millis();
  }
}
