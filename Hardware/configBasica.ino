#define IR_PIN 13 
#define LED_PIN 12 
#define GREEN 14
#define RESET 2
#define RED2 26
#define GREEN2 25
#define IR_PIN2 27

unsigned long startTime = 0;        
unsigned long ledOnTime1 = 0;     
unsigned long ledOffTime1 = 0;
unsigned long totalLedOnTime1 = 0;  
bool ledState1 = LOW;

unsigned long ledOnTime2 = 0;     
unsigned long ledOffTime2 = 0;
unsigned long totalLedOnTime2 = 0;  
bool ledState2 = LOW;

void setup() {
  Serial.begin(9600);
  pinMode(IR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(RESET, INPUT_PULLUP);
  pinMode(RED2, OUTPUT);
  pinMode(IR_PIN2, INPUT);
  pinMode(GREEN2, OUTPUT);

  digitalWrite(LED_PIN, LOW);
  digitalWrite(GREEN, LOW);
  digitalWrite(RED2, LOW);
  digitalWrite(GREEN2, LOW);

  resetState(); 
}

void resetState() {
  startTime = millis(); 
  totalLedOnTime1 = 0;  
  ledState1 = LOW;
  digitalWrite(LED_PIN, LOW);
  digitalWrite(GREEN, LOW);

  totalLedOnTime2 = 0;  
  ledState2 = LOW;
  digitalWrite(RED2, LOW);
  digitalWrite(GREEN2, LOW);
}

void loop() {
  if (millis() - startTime >= 10000) {
    float ledOffTime1 = 10.0 - totalLedOnTime1 / 1000.0;
    Serial.print("Tiempo total LED 1 encendido: ");
    Serial.print(ledOffTime1); 
    Serial.println(" segundos");

    float ledOffTime2 = 10.0 - totalLedOnTime2 / 1000.0;
    Serial.print("Tiempo total LED 2 encendido: ");
    Serial.print(ledOffTime2); 
    Serial.println(" segundos");

    while (1) {
      digitalWrite(LED_PIN, LOW);
      digitalWrite(GREEN, LOW);
      digitalWrite(RED2, LOW);
      digitalWrite(GREEN2, LOW);
      if(digitalRead(RESET) == HIGH){
        resetState();
        break;
      }
    }
  }

  int irValue1 = digitalRead(IR_PIN);
  if (irValue1 == LOW && ledState1 == HIGH) { 
    digitalWrite(LED_PIN, LOW);
    digitalWrite(GREEN, HIGH);
    ledState1 = LOW;
    ledOffTime1 = millis();  
    totalLedOnTime1 += (ledOffTime1 - ledOnTime1); 
  } else if (irValue1 == HIGH && ledState1 == LOW) {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(GREEN, LOW);
    ledState1 = HIGH;
    ledOnTime1 = millis();
  }

  int irValue2 = digitalRead(IR_PIN2);
  if (irValue2 == LOW && ledState2 == HIGH) { 
    digitalWrite(RED2, LOW);
    digitalWrite(GREEN2, HIGH);
    ledState2 = LOW;
    ledOffTime2 = millis();  
    totalLedOnTime2 += (ledOffTime2 - ledOnTime2); 
  } else if (irValue2 == HIGH && ledState2 == LOW) {
    digitalWrite(RED2, HIGH);
    digitalWrite(GREEN2, LOW);
    ledState2 = HIGH;
    ledOnTime2 = millis();
  }
}
