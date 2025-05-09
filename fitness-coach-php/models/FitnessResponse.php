<?php
/**
 * FitnessResponse Class
 * 
 * Handles generating responses to fitness-related queries
 */
class FitnessResponse {
    // Fitness knowledge base - simplified for this example
    private $knowledgeBase = [
        'workout' => [
            'beginners' => "For beginners, I recommend starting with a full-body workout 3 times per week. Here's a simple routine:\n1. Bodyweight squats: 3 sets of 12-15 reps\n2. Push-ups (or knee push-ups): 3 sets of 8-12 reps\n3. Dumbbell rows: 3 sets of 10 reps per arm\n4. Plank: 3 sets, hold for 20-30 seconds\n5. Walking lunges: 2 sets of 10 steps per leg",
            'intermediate' => "For intermediate fitness levels, try a 4-day split:\n- Day 1: Chest & Triceps\n- Day 2: Back & Biceps\n- Day 3: Rest\n- Day 4: Legs & Shoulders\n- Day 5: Full body circuit\n- Days 6-7: Rest or active recovery",
            'advanced' => "For advanced training, consider a 5-day split with periodization:\n- Day 1: Chest & Triceps (heavy)\n- Day 2: Back & Biceps (heavy)\n- Day 3: Legs (heavy)\n- Day 4: Shoulders & Arms (hypertrophy)\n- Day 5: Full Body (functional)\n- Days 6-7: Rest or active recovery"
        ],
        'nutrition' => [
            'protein' => "For protein intake, the general recommendation is 0.8-1g per pound of bodyweight daily. So if you weigh 150 pounds, aim for 120-150g of protein daily. Good sources include lean meats, fish, eggs, dairy, and plant-based options like tofu, lentils, and beans.",
            'calories' => "To calculate your daily calorie needs, first determine your Basal Metabolic Rate (BMR) using the Harris-Benedict equation, then multiply by your activity level factor:\n- Sedentary: BMR × 1.2\n- Lightly active: BMR × 1.375\n- Moderately active: BMR × 1.55\n- Very active: BMR × 1.725",
            'meal plan' => "A balanced meal plan should include:\n- Protein: 25-30% of calories\n- Carbohydrates: 40-50% of calories\n- Fats: 20-35% of calories\nAim for 3 main meals and 1-2 snacks daily, with plenty of vegetables, fruits, whole grains, lean proteins, and healthy fats."
        ],
        'cardio' => [
            'beginner' => "For beginners, start with 20-30 minutes of moderate-intensity cardio 3 times per week. Options include walking, cycling, or swimming. Gradually increase duration before increasing intensity.",
            'weight loss' => "For weight loss, aim for 150-300 minutes of moderate-intensity cardio per week, combined with strength training 2-3 times weekly. High-Intensity Interval Training (HIIT) can be especially effective, but start with just 1-2 sessions per week.",
            'heart health' => "For heart health, the American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities at least 2 days per week."
        ]
    ];
    
    /**
     * Generate a response based on the user's message
     * 
     * @param string $message The user's message
     * @return string The generated response
     */
    public function generateResponse($message) {
        $message = strtolower($message);
        
        // Check for workout-related queries
        if (strpos($message, 'workout') !== false || strpos($message, 'exercise') !== false) {
            if (strpos($message, 'beginner') !== false) {
                return $this->knowledgeBase['workout']['beginners'];
            } elseif (strpos($message, 'intermediate') !== false) {
                return $this->knowledgeBase['workout']['intermediate'];
            } elseif (strpos($message, 'advanced') !== false) {
                return $this->knowledgeBase['workout']['advanced'];
            } else {
                return "I can provide workout recommendations for beginners, intermediate, and advanced fitness levels. What's your current fitness level?";
            }
        }
        
        // Check for nutrition-related queries
        if (strpos($message, 'nutrition') !== false || strpos($message, 'diet') !== false || strpos($message, 'food') !== false) {
            if (strpos($message, 'protein') !== false) {
                return $this->knowledgeBase['nutrition']['protein'];
            } elseif (strpos($message, 'calorie') !== false) {
                return $this->knowledgeBase['nutrition']['calories'];
            } elseif (strpos($message, 'meal') !== false || strpos($message, 'plan') !== false) {
                return $this->knowledgeBase['nutrition']['meal plan'];
            } else {
                return "I can provide nutrition advice on protein intake, calorie needs, and meal planning. What specific nutrition information are you looking for?";
            }
        }
        
        // Check for cardio-related queries
        if (strpos($message, 'cardio') !== false || strpos($message, 'running') !== false || strpos($message, 'heart') !== false) {
            if (strpos($message, 'beginner') !== false) {
                return $this->knowledgeBase['cardio']['beginner'];
            } elseif (strpos($message, 'weight loss') !== false || strpos($message, 'lose weight') !== false) {
                return $this->knowledgeBase['cardio']['weight loss'];
            } elseif (strpos($message, 'heart') !== false) {
                return $this->knowledgeBase['cardio']['heart health'];
            } else {
                return "I can provide cardio recommendations for beginners, weight loss, or heart health. What's your specific goal with cardio?";
            }
        }
        
        // Default response for unrecognized queries
        return "I'm your fitness coach assistant! I can help with workout routines, nutrition advice, and cardio recommendations. What would you like to know about?";
    }
}