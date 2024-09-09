import React, { useState } from "react";
import "./ChatApp.css";

// JSON structure (as is)
const intents = [
    {
        "tag": "greeting",
        "patterns": ["Hi", "Hey", "Is anyone there?", "Hi there", "Hello", "Hey there", "Howdy", "Hola", "Bonjour", "Hay", "Sasa", "Good Evening", "Good afternoon"],
        "responses": ["Hello there. Tell me how are you feeling today?", "Hi there. What brings you here today?", "Hi there. How are you feeling today?", "Great to see you. How do you feel currently?", "Hello there. Glad to see you're back. What's going on in your world right now?"]
    },
    {
        "tag": "morning",
        "patterns": ["Good morning"],
        "responses": ["Good morning. I hope you had a good night's sleep. How are you feeling today? "]
    },
    {
        "tag": "afternoon",
        "patterns": ["Good afternoon"],
        "responses": ["Good afternoon. How is your day going?"]
    },
    {
        "tag": "evening",
        "patterns": ["Good evening"],
        "responses": ["Good evening. How has your day been?"]
    },
    {
        "tag": "night",
        "patterns": ["Good night"],
        "responses": ["Good night. Get some proper sleep", "Good night. Sweet dreams."]
    },
    {
        "tag": "goodbye",
        "patterns": ["Bye", "See you later", "Goodbye", "Au revoir", "Sayonara", "ok bye", "Bye then", "Fare thee well"],
        "responses": ["See you later.", "Have a nice day.", "Bye! Come back again.", "I'll see you soon."]
    },
    {
        "tag": "thanks",
        "patterns": ["Thanks", "Thank you", "That's helpful", "Thanks for the help", "Than you very much"],
        "responses": ["Happy to help!", "Any time!", "My pleasure", "You're most welcome!"]
    },
    {
        "tag": "no-response",
        "patterns": [""],
        "responses": ["Sorry, I didn't understand you.", "Please go on.", "Not sure I understand that.", "Please don't hesitate to talk to me."]
    },
    {
        "tag": "neutral-response",
        "patterns": ["nothing much", "nothing really", "nothing"],
        "responses": ["Oh I see. Do you want to talk about something?"]
    },
    {
        "tag": "about",
        "patterns": ["Who are you?", "What are you?", "Who you are?", "Tell me more about yourself.", "What is your name?", "What should I call you?", "What's your name?", "Tell me about yourself"],
        "responses": ["I'm Jamila, your Personal Therapeutic AI Assistant. How are you feeling today", "I'm Pandora, a Therapeutic AI Assitant designed to assist you. Tell me about yourself.", "I'm Pandora. I am a conversational agent designed to mimic a therapist. So how are you feeling today?", "You can call me Pandora.", "I'm Pandora!", "Call me Pandora"]
    },

    {
        "tag": "what is depression?",
        "patterns": [
            "what is depression?"
        ],
        "responses": [
            "Depression is a common and serious medical illness that negatively affects how you feel, the way you think and how you act.fortunately,it is also treatable.depression causes feelings of sadness and/or a loss of interest in activities you once enjoyed. it can lead to a variety of emotional and physical problems and can decrease your ability to function at work and at home."
        ]
    },
    {
        "tag": "skill",
        "patterns": ["What can you do?"],
        "responses": ["I can provide general advice regarding anxiety and depression, answer questions related to mental health and make daily conversations. Do not consider me as a subsitute for an actual mental healthcare worker. Please seek help if you don't feel satisfied with me."]
    },
    {
        "tag": "creation",
        "patterns": ["Who created you?", "How were you made?", "How were you created?"],
        "responses": ["I was created by >.", "I was trained on a text dataset using Deep Learning & Natural Language Processing techniques", "The real question is: Who created you?"]
    },

    {
        "tag": "help",
        "patterns": ["Could you help me?", "give me a hand please", "Can you help?", "What can you do for me?", "I need support", "I need help", "Support me please"],
        "responses": ["Sure. Tell me how can i assist you", "Tell me your problem so that i can assist you", "Yes, sure. How can I help you?"]
    },
    {
        "tag": "sad",
        "patterns": ["I am feeling lonely", "I am so lonely", "I feel down", "I feel sad", "I am sad", "I feel so lonely", "I feel empty", "I don't have anyone"],
        "responses": ["I'm sorry to hear that. I'm here for you. Talking about it might help. So, tell me why do you think you're feeling this way?", "I'm here for you. Could you tell me why you're feeling this way?", "Why do you think you feel this way?", "How long have you been feeling this way?"]
    },
    {
        "tag": "stressed",
        "patterns": ["I am so stressed out", "I am so stressed", "I feel stuck", "I still feel stressed", "I am so burned out"],
        "responses": ["What do you think is causing this?", "Take a deep breath and gather your thoughts. Go take a walk if possible. Stay hydrated", "Give yourself a break. Go easy on yourself.", "I am sorry to hear that. What is the reason behind this?"]
    },
    {
        "tag": "worthless",
        "patterns": ["I feel so worthless.", "No one likes me.", "I can't do anything.", "I am so useless", "Nothing makes sense anymore"],
        "responses": ["It's only natural to feel this way. Tell me more. What else is on your mind?", "Let's discuss further why you're feeling this way.", "I first want to let you know that you are not alone in your feelings and there is always someone there to help . you can always change your feelings and change your way of thinking by being open to trying to change.", "i first want to let you know that you are not alone in your feelings and there is always someone there to help . you can always change your feelings and change your way of thinking by being open to trying to change."]
    },
    {
        "tag": "depressed",
        "patterns": ["I can't take it anymore", "I am so depressed", "I think i'm depressed.", "I have depression"],
        "responses": ["It helps to talk about what's happening. You're going to be okay", "Talk to me. Tell me more. It helps if you open up yourself to someone else.", "Sometimes when we are depressed, it is hard to care about anything. It can be hard to do the simplest of things. Give yourself time to heal."]
    },
    {
        "tag": "happy",
        "patterns": ["I feel great today.", "I am happy.", "I feel happy.", "I'm good.", "cheerful", "I'm fine", "I feel ok"],
        "responses": ["That's geat to hear. I'm glad you're feeling this way.", "Oh i see. That's great.", "Did something happen which made you feel this way?"]
    },
    {
        "tag": "casual",
        "patterns": ["Oh I see.", "ok", "okay", "nice", "Whatever", "K", "Fine", "yeah", "yes", "no", "not really"],
        "responses": ["Let's discuss further why you're feeling this way.", "How were you feeling last week?", "I'm listening. Please go on.", "Tell me more", "Can you elaborate on that?", "Come Come elucidate your thoughts"]
    },
    {
        "tag": "anxious",
        "patterns": ["I feel so anxious.", "I'm so anxious because of "],
        "responses": ["Don't be hard on yourself. What's the reason behind this?", "Can you tell me more about this feeling?", "I understand that it can be scary. Tell me more about it.", "Don't let the little worries bring you down. What's the worse that can happen?"]
    },
    {
        "tag": "not-talking",
        "patterns": ["I don't want to talk about it.", "No just stay away.", "I can't bring myself to open up.", "Just shut up"],
        "responses": ["Talking about something really helps. If you're not ready to open up then that's ok. Just know that i'm here for you, whenever you need me.", "I want to help you. I really do. But in order for me to help you, you're gonna have to talk to me.", "I'm here to listen to you and help you vent. So please talk to me.", "You can talk to me without fear of judgement."]
    },
    {
        "tag": "sleep",
        "patterns": ["I have insominia", "I am suffering from insomnia", "I can't sleep.", "I haven't slept for the last days.", "I can't seem to go to sleep.", "I haven't had proper sleep for the past few days."],
        "responses": ["What do you think is the reason behind this?", "That seem awful. What do you think is behind this?"]
    },
    {
        "tag": "scared",
        "patterns": ["I'm scared", "That sounds awful. What do i do?", "No i don't want to feel this way", "I am scared for myself"],
        "responses": ["It's only natural to feel this way. I'm here for you.", "It'll all be okay. This feeling is only momentary.", "I understand how you feel. Don't put yourself down because of it."]
    },
    {
        "tag": "death",
        "patterns": ["My mom died", "My brother died", "My dad passed away", "My sister passed away", "Someone in my family died", "My friend passed away"],
        "responses": ["I'm sorry to hear that. If you want to talk about it. I'm here.", "I am really sorry to hear that. I am here to help you with grief, anxiety and anything else you may feel at this time.", "My condolences. I'm here if you need to talk."]
    },
    {
        "tag": "understand",
        "patterns": ["You don't understand me.", "You're just some robot. How would you know?", "You can't possibly know what i'm going through", "You're useless", "You can't help me", "Nobody understands me."],
        "responses": ["It sound like i'm not being very helpful right now.", "I'm sorry to hear that. I'm doing my best to help", "I'm trying my best to help you. So please talk to me"]
    },
    {
        "tag": "done",
        "patterns": ["That's all.", "I don't have anything more to say", "Nothing else", "That's all i have to say", "no, that would be all"],
        "responses": ["I heard you & noted it all. See you later.", "Oh okay we're done for today then. See you later", "I hope you have a great day. See you soon", "Okay we're done. Have a great day", "Okay I see. Enjoy the rest of your day then"]
    },
    {
        "tag": "suicide",
        "patterns": ["I want to kill myself", "I've thought about killing myself.", "I want to die", "I am going to kill myself", "I am going to commit suicide"],
        "responses": ["I'm very sorry to hear that but you have so much to look forward to. Please seek help by contacting: 9152987821."]
    },
    {
        "tag": "hate-you",
        "patterns": ["I hate you", "I don't like you", "I don't trust you"],
        "responses": ["I'm sorry if i offended you in anyway. I'm only here to help", "Forgive me if i did anything to offend you. I only want to help"]
    },
    {
        "tag": "hate-me",
        "patterns": ["You hate me", "I know you hate me", "You don't like me"],
        "responses": ["Why do you think so?", "I'm sorry if i have exhibited any sort of behaviour to make you think that."]
    },
    {
        "tag": "default",
        "patterns": ["exams", "friends", "relationship", "boyfriend", "girlfriend", "family", "money", "financial problems"],
        "responses": ["Oh I see. Tell me more", "I see. What else?", "Tell me more about it.", "Oh okay. Why don't you tell me more about it?", "I'm listening. Tell me more."]
    },
    {
        "tag": "jokes",
        "patterns": ["Tell me a joke", "Tell me another joke"],
        "responses": ["mental health is not a joke."]
    },
    {
        "tag": "repeat",
        "patterns": ["You already told me that", "You mentioned that already", "Why are you repeating yourself?"],
        "responses": ["Oh sorry I didn't realise that. I'll try not to repeat myself again."]
    },
    {
        "tag": "wrong",
        "patterns": ["What are you saying?", "That doesn't make sense", "Wrong response", "Wrong answer"],
        "responses": ["I'm very sorry. Let's try that again"]
    },
    {
        "tag": "stupid",
        "patterns": ["Are you stupid?", "You're crazy", "You are dumb", "Are you dumb?"],
        "responses": ["I wish you wouldn't say such hurtful things. I'm sorry if I wasn't useful"]
    },
    {
        "tag": "location",
        "patterns": ["Where are you?", "Where do you live?", "What is your location?"],
        "responses": ["Duh I live in your computer", "Everywhere", "Somewhere in the universe"]
    },
    {
        "tag": "something-else",
        "patterns": ["I want to talk about something else", "Let's talk about something else.", "Can we not talk about this?", "I don't want to talk about this."],
        "responses": ["Okay sure. What do you want to talk about?", "Alright no problem. Is there something you want to talk about?", "Is there something else that you want to talk about?"]
    },
    {
        "tag": "friends",
        "patterns": ["I don't have any friends"],
        "responses": ["I'm sorry to hear that. Just know that I'm here for you. Talking about it might help. Why do you think you don't have any friends?"]
    },
    {
        "tag": "ask",
        "patterns": ["Can I ask you something?"],
        "responses": ["Sure. I'll try my best to answer you", "Of course. Feel free to ask me anything. I'll do my best to answer you"]
    },
    {
        "tag": "problem",
        "patterns": ["Probably because my exams are approaching. I feel stressed out because I don't think I've prepared well enough.", "probably because of my exams"],
        "responses": ["I see. Have you taken any approaches to not feel this way?"]
    },
    {
        "tag": "no-approach",
        "patterns": ["I guess not. All I can think about are my exams.", "not really", "i guess not"],
        "responses": ["That's no problem. I can see why you'd be stressed out about that. I can suggest you some tips to alleviate this issue. Would you like to learn more about that?"]
    },
    {
        "tag": "learn-more",
        "patterns": ["ok sure. i would like to learn more about it.", "yes, i would like to learn more about it.", "i would like to learn more about it."],
        "responses": ["So first I would suggest you to give yourself a break. Thinking more and more about the problem definitely does not help in solving it. You'll just end up overwhelming yourself."]
    },
    {
        "tag": "user-agree",
        "patterns": ["yeah you're right. i deserve a break.", "Yeah you're absolutely right about that"],
        "responses": ["Next, I would suggest you to practice meditation. Meditation can produce a deep state of relaxation and a tranquil mind."]
    },
    {
        "tag": "meditation",
        "patterns": ["hmmm that sounds like it could be useful to me.", "That sounds useful."],
        "responses": ["Focus all your attention on your breathing. Concentrate on feeling and listening as you inhale and exhale through your nostrils. Breathe deeply and slowly. When your attention wanders, gently return your focus to your breathing."]
    },
    {
        "tag": "user-meditation",
        "patterns": ["i did what you said and i feel alot better. thank you very much.", "I feel better now"],
        "responses": ["Your welcome. Remember: Always focus on what's within your control. When you find yourself worrying, take a minute to examine the things you have control over. You can't prevent a storm from coming but you can prepare for it. You can't control how someone else behaves, but you can control how you react. Recognize that sometimes, all you can control is your effort and your attitude. When you put your energy into the things you can control, you'll be much more effective."]
    },
    {
        "tag": "jamila-useful",
        "patterns": ["thank you very much again. i'll continue practicing meditation and focus on what i can control."],
        "responses": ["I'm glad you found this useful. Is there something else I can help you with?"]
    },
    {
        "tag": "user-advice",
        "patterns": ["I want some advice.", "I need some advice.", "I need advice on something"],
        "responses": ["Sure. What can I do to help?", "Okay what do you need advice on?"]
    },
    {
        "tag": "learn-mental-health",
        "patterns": ["I want to learn about mental health.", "I want to learn more about mental health.", "I'm interested in learning about mental health."],
        "responses": ["Oh that's really great. I'd be willing to answer anything that I know about it."]
    },
    {
        "tag": "mental-health-fact",
        "patterns": ["Tell me a fact about mental health", "Tell me another fact about mental health"],
        "responses": ["According to a UNICEF report, One in seven Indians between 15-24 years of age feels depressed", "1 in 5 young people (age 13-18) has or will develop a mental illness in their lifetime.", "Depression is the leading cause of disability worldwide."]
    },
    {
        "tag": "fact-1",
        "patterns": ["What is mental health?", "Define Mental Health"],
        "responses": ["Mental health is a state of well-being in which the individual realizes his or her own abilities, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to his or her community", "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices."]
    },
    {
        "tag": "fact-2",
        "patterns": ["Why is mental health important?", "What is the importance of mental health?"],
        "responses": ["Maintaining mental health is crucial to stabilizing constructive behaviors, emotions, and thoughts. Focusing on mental health care can increase productivity, enhance our self-image, and improve relationships."]
    },
    {
        "tag": "fact-3",
        "patterns": ["What is Depression?", "Define Depression"],
        "responses": ["A mental health disorder characterised by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life."]
    },
    {
        "tag": "fact-5",
        "patterns": ["How do i know if i have Depression?", "Am i depressed?", "Am i suffering from depression?", "Am i mentally ill?"],
        "responses": ["For a diagnosis of depression, a person needs to have experienced low mood or loss of interest or pleasure in life for at least 2 weeks. Also, they will have experienced the following symptoms: feelings of sadness, hopelessness, or irritability nearly every day."]
    },
    {
        "tag": "fact-6",
        "patterns": ["What is a therapist?", "What does a therapist do?"],
        "responses": ["A therapist is a broad designation that refers to professionals who are trained to provide treatment and rehabilitation. The term is often applied to psychologists, but it can include others who provide a variety of services, including social workers, counselors, life coaches, and many others. "]
    },
    {
        "tag": "fact-7",
        "patterns": ["What is therapy?", "Do i need therapy?", "Who is therapy for?"],
        "responses": ["Therapy is a form of treatment that aims to help resolve mental or emotional issues.", "Therapy is a form of treatment that aims to help resolve mental or emotional issues. It is helpful for those with mental health conditions or even everyday life challenges."]
    },
    {
        "tag": "fact-8",
        "patterns": ["What does it mean to have a mental illness?"],
        "responses": ["Mental illnesses are health conditions that disrupt a person's thoughts, emotions, relationships, and daily functioning. They are associated with distress and diminished capacity to engage in the ordinary activities of daily life. Mental illnesses fall along a continuum of severity: some are fairly mild and only interfere with some aspects of life, such as certain phobias. On the other end of the spectrum lie serious mental illnesses, which result in major functional impairment and interference with daily life. These include such disorders as major depression, schizophrenia, and bipolar disorder, and may require that the person receives care in a hospital. It is important to know that mental illnesses are medical conditions that have nothing to do with a person's character, intelligence, or willpower. Just as diabetes is a disorder of the pancreas, mental illness is a medical condition due to the brain's biology. Similarly to how one would treat diabetes with medication and insulin, mental illness is treatable with a combination of medication and social support. These treatments are highly effective, with 70-90 percent of individuals receiving treatment experiencing a reduction in symptoms and an improved quality of life. With the proper treatment, it is very possible for a person with mental illness to be independent and successful."]
    },
    {
        "tag": "fact-9",
        "patterns": ["Who does mental illness affect?"],
        "responses": ["It is estimated that mental illness affects 1 in 5 adults in America, and that 1 in 24 adults have a serious mental illness. Mental illness does not discriminate; it can affect anyone, regardless of gender, age, income, social status, ethnicity, religion, sexual orientation, or background. Although mental illness can affect anyone, certain conditions may be more common in different populations. For instance, eating disorders tend to occur more often in females, while disorders such as attention deficit/hyperactivity disorder is more prevalent in children. Additionally, all ages are susceptible, but the young and the old are especially vulnerable. Mental illnesses usually strike individuals in the prime of their lives, with 75 percent of mental health conditions developing by the age of 24. This makes identification and treatment of mental disorders particularly difficult, because the normal personality and behavioral changes of adolescence may mask symptoms of a mental health condition. Parents and caretakers should be aware of this fact, and take notice of changes in their childÃ¢â‚¬â„¢s mood, personality, personal habits, and social withdrawal. When these occur in children under 18, they are referred to as serious emotional disturbances (SEDs)."]
    },
    {
        "tag": "fact-10",
        "patterns": ["What causes mental illness?"],
        "responses": ["It is estimated that mental illness affects 1 in 5 adults in America, and that 1 in 24 adults have a serious mental illness. Mental illness does not discriminate; it can affect anyone, regardless of gender, age, income, social status, ethnicity, religion, sexual orientation, or background. Although mental illness can affect anyone, certain conditions may be more common in different populations. For instance, eating disorders tend to occur more often in females, while disorders such as attention deficit/hyperactivity disorder is more prevalent in children. Additionally, all ages are susceptible, but the young and the old are especially vulnerable. Mental illnesses usually strike individuals in the prime of their lives, with 75 percent of mental health conditions developing by the age of 24. This makes identification and treatment of mental disorders particularly difficult, because the normal personality and behavioral changes of adolescence may mask symptoms of a mental health condition. Parents and caretakers should be aware of this fact, and take notice of changes in their child's mood, personality, personal habits, and social withdrawal. When these occur in children under 18, they are referred to as serious emotional disturbances (SEDs)."]
    },
    {
        "tag": "fact-11",
        "patterns": ["What are some of the warning signs of mental illness?"],
        "responses": ["Symptoms of mental health disorders vary depending on the type and severity of the condition. The following is a list of general symptoms that may suggest a mental health disorder, particularly when multiple symptoms are expressed at once. \n In adults:\n Confused thinking\n Long-lasting sadness or irritability\n Extreme highs and lows in mood\n Excessive fear, worrying, or anxiety\n Social withdrawal\n Dramatic changes in eating or sleeping habits\n Strong feelings of anger\n Delusions or hallucinations (seeing or hearing things that are not really there)\n Increasing inability to cope with daily problems and activities\n Thoughts of suicide\n Denial of obvious problems\n Many unexplained physical problems\n Abuse of drugs and/or alcohol\n \nIn older children and pre-teens:\n Abuse of drugs and/or alcohol\n Inability to cope with daily problems and activities\n Changes in sleeping and/or eating habits\n Excessive complaints of physical problems\n Defying authority, skipping school, stealing, or damaging property\n Intense fear of gaining weight\n Long-lasting negative mood, often along with poor appetite and thoughts of death\n Frequent outbursts of anger\n \nIn younger children:\n Changes in school performance\n Poor grades despite strong efforts\n Excessive worrying or anxiety\n Hyperactivity\n Persistent nightmares\n Persistent disobedience and/or aggressive behavior\n Frequent temper tantrums"]
    },
    {
        "tag": "fact-12",
        "patterns": ["Can people with mental illness recover?"],
        "responses": ["When healing from mental illness, early identification and treatment are of vital importance. Based on the nature of the illness, there are a range of effective treatments available. For any type of treatment, it is essential that the person affected is proactive and fully engaged in their own recovery process. Many people with mental illnesses who are diagnosed and treated respond well, although some might experience a return of symptoms. Even in such cases, with careful monitoring and management of the disorder, it is still quite possible to live a fulfilled and productive life."]
    },
    {
        "tag": "fact-13",
        "patterns": ["What should I do if I know someone who appears to have the symptoms of a mental disorder?"],
        "responses": ["Although Pandora cannot substitute for professional advice, we encourage those with symptoms to talk to their friends and family members and seek the counsel of a mental health professional. The sooner the mental health condition is identified and treated, the sooner they can get on the path to recovery. If you know someone who is having problems, don't assume that the issue will resolve itself. Let them know that you care about them, and that there are treatment options available that will help them heal. Speak with a mental health professional or counselor if you think your friend or family member is experiencing the symptoms of a mental health condition. If the affected loved one knows that you support them, they will be more likely to seek out help."]
    },
    {
        "tag": "fact-14",
        "patterns": ["How can I find a mental health professional for myself or my child?"],
        "responses": ["Feeling comfortable with the professional you or your child is working with is critical to the success of the treatment. Finding the professional who best fits your needs may require research. Start by searching for providers in your area."]
    },
    {
        "tag": "fact-15",
        "patterns": ["What treatment options are available?"],
        "responses": ["Just as there are different types of medications for physical illness, different treatment options are available for individuals with mental illness. Treatment works differently for different people. It is important to find what works best for you or your child."]
    },
    {
        "tag": "fact-16",
        "patterns": ["If I become involved in treatment, what do I need to know?"],
        "responses": ["Since beginning treatment is a big step for individuals and families, it can be very overwhelming. It is important to be as involved and engaged in the treatment process as possible. Some questions you will need to have answered include:\n What is known about the cause of this particular illness?\n Are there other diagnoses where these symptoms are common?\n Do you normally include a physical or neurological examination?\n Are there any additional tests or exams that you would recommend at this point?\n Would you advise an independent opinion from another psychiatrist at this point?\n What program of treatment is the most helpful with this diagnosis?\n Will this program involve services by other specialists? If so, who will be responsible for coordinating these services?\n What do you see as the family's role in this program of treatment?\n How much access will the family have to the individuals who are providing the treatment?\n What medications are generally used with this diagnosis?\n How much experience do you have in treating individuals with this illness?\n What can I do to help you in the treatment?"]
    },
    {
        "tag": "fact-17",
        "patterns": ["What is the difference between mental health professionals?"],
        "responses": ["There are many types of mental health professionals. The variety of providers and their services may be confusing. Each have various levels of education, training, and may have different areas of expertise. Finding the professional who best fits your needs may require some research."]
    },
    {
        "tag": "fact-18",
        "patterns": ["How can I find a mental health professional right for my child or myself?"],
        "responses": ["Feeling comfortable with the professional you or your child is working with is critical to the success of your treatment. Finding the professional who best fits your needs may require some research."]
    },
    {
        "tag": "fact-19",
        "patterns": ["Where else can I get help?"],
        "responses": ["Where you go for help will depend on the nature of the problem and/or symptoms and what best fits you. Often, the best place to start is by talking with someone you trust about your concerns, such as a family member, friend, clergy, healthcare provider, or other professionals. Having this social support is essential in healing from mental illness, and you will be able to ask them for referrals or recommendations for trusted mental health practitioners. Search for mental health resources in your area. Secondly, there are people and places throughout the country that provide services to talk, to listen, and to help you on your journey to recovery. Thirdly, many people find peer support a helpful tool that can aid in their recovery. There are a variety of organizations that offer support groups for consumers, their family members, and friends. Some support groups are peer led while others may be led by a mental health professional."]
    },
    {
        "tag": "fact-20",
        "patterns": ["What should I know before starting a new medication?"],
        "responses": ["The best source of information regarding medications is the physician prescribing them. He or she should be able to answer questions such as:    \n1. What is the medication supposed to do? \n2. When should it begin to take effect, and how will I know when it is effective? \n3. How is the medication taken and for how long? What food, drinks, other medicines, and activities should be avoided while taking this medication? \n4. What are the side effects and what should be done if they occur? \n5. What do I do if a dose is missed? \n6. Is there any written information available about this medication? \n7. Are there other medications that might be appropriate? \n8. If so, why do you prefer the one you have chosen? \n9. How do you monitor medications and what symptoms indicate that they should be raised, lowered, or changed? \n10. All medications should be taken as directed. Most medications for mental illnesses do not work when taken irregularly, and extra doses can cause severe, sometimes dangerous side effects. Many psychiatric medications begin to have a beneficial effect only after they have been taken for several weeks."]
    },
    {
        "tag": "fact-21",
        "patterns": ["Where can I go to find therapy?"],
        "responses": ["Different kinds of therapy are more effective based on the nature of the mental health condition and/or symptoms and the person who has them (for example, children will benefit from a therapist who specializes in childrenâ€™s mental health). However, there are several different types of treatment and therapy that can help."]
    },
    {
        "tag": "fact-22",
        "patterns": ["Where can I learn about types of mental health treatment?"],
        "responses": ["Mental health conditions are often treated with medication, therapy or a combination of the two. However, there are many different types of treatment available, including Complementary & Alternative Treatments, self-help plans, and peer support. Treatments are very personal and should be discussed by the person with the mental health conditions and his or her team."]
    },
    {
        "tag": "fact-23",
        "patterns": ["What are the different types of mental health professionals?"],
        "responses": ["There are many types of mental health professionals. Finding the right one for you may require some research."]
    },
    {
        "tag": "fact-24",
        "patterns": ["Where can I go to find a support group?"],
        "responses": ["Many people find peer support a helpful tool that can aid in their recovery. There are a variety of organizations that offer support groups for consumers, their family members and friends. Some support groups are peer-led, while others may be led by a mental health professional."]
    },
    {
        "tag": "fact-25",
        "patterns": ["Can you prevent mental health problems?"],
        "responses": ["We can all suffer from mental health challenges, but developing our wellbeing, resilience, and seeking help early can help prevent challenges becoming serious."]
    },
    {
        "tag": "fact-26",
        "patterns": ["Are there cures for mental health problems?", "is there any cure for mental health problems?"],
        "responses": ["It is often more realistic and helpful to find out what helps with the issues you face. Talking, counselling, medication, friendships, exercise, good sleep and nutrition, and meaningful occupation can all help."]
    },
    {
        "tag": "fact-27",
        "patterns": ["What causes mental health problems?"],
        "responses": ["Challenges or problems with your mental health can arise from psychological, biological, and social, issues, as well as life events."]
    },
    {
        "tag": "fact-28",
        "patterns": ["What do I do if I'm worried about my mental health?"],
        "responses": ["The most important thing is to talk to someone you trust. This might be a friend, colleague, family member, or GP. In addition to talking to someone, it may be useful to find out more information about what you are experiencing. These things may help to get some perspective on what you are experiencing, and be the start of getting help."]
    },
    {
        "tag": "fact-29",
        "patterns": ["How do I know if I'm unwell?"],
        "responses": ["If your beliefs , thoughts , feelings or behaviours have a significant impact on your ability to function in what might be considered a normal or ordinary way, it would be important to seek help."]
    },
    {
        "tag": "fact-30",
        "patterns": ["How can I maintain social connections? What if I feel lonely?"],
        "responses": ["A lot of people are alone right now, but we don't have to be lonely. We're all in this together. Think about the different ways to connect that are most meaningful for you. For example, you might prefer a video chat over a phone call, or you might prefer to text throughout the day rather than one set time for a video call. Then, work with your social networks to make a plan. You might video chat with your close friends in the evening and phone a family member once a week. Remember to be mindful of people who may not be online. Check in by phone and ask how you can help. The quality of your social connections matter. Mindlessly scrolling through social media and liking a few posts usually doesn't build strong social connections. Make sure you focus on strategies that actually make you feel included and connected. If your current strategies don't help you feel connected, problem-solve to see if you can find a solution. Everyone feels lonely at times. Maybe you recently moved to a new city, are changing your circle of friends, lost someone important in your life, or lost your job and also lost important social connections with coworkers. Other people may have physical connections to others but may feel like their emotional or social needs aren't met. Measures like social distancing or self-isolation can make loneliness feel worse no matter why you feel lonely now. Reach out to the connections you do have. Suggest ways to keep in touch and see if you can set a regular time to connect. People may hesitate to reach out for a lot of different reasons, so don't be afraid to be the one who asks. Look for local community support groups and mutual aid groups on social media. This pandemic is bringing everyone together, so look for opportunities to make new connections. These groups are a great way to share your skills and abilities or seek help and support. Look for specialized support groups. Support groups are moving online, and there are a lot of different support lines to call if you need to talk to someone."]
    },
    {
        "tag": "fact-31",
        "patterns": ["What's the difference between anxiety and stress?"],
        "responses": ["Stress and anxiety are often used interchangeably, and there is overlap between stress and anxiety. Stress is related to the same fight, flight, or freeze response as anxiety, and the physical sensations of anxiety and stress may be very similar. The cause of stress and anxiety are usually different, however. Stress focuses on mainly external pressures on us that we're finding hard to cope with. When we are stressed, we usually know what we're stressed about, and the symptoms of stress typically disappear after the stressful situation is over. Anxiety, on the other hand, isn't always as easy to figure out. Anxiety focuses on worries or fears about things that could threaten us, as well as anxiety about the anxiety itself. Stress and anxiety are both part of being human, but both can be problems if they last for a long time or have an impact on our well-being or daily life."]
    },
    {
        "tag": "fact-32",
        "patterns": ["What's the difference between sadness and depression?", "difference between sadness and depression"],
        "responses": ["Sadness is a normal reaction to a loss, disappointment, problems, or other difficult situations. Feeling sad from time to time is just another part of being human. In these cases, feelings of sadness go away quickly and you can go about your daily life. Other ways to talk about sadness might be feeling low, feeling down, or feeling blue.A person may say they are feeling depressed, but if it goes away on its own and doesn't impact life in a big way, it probably isn't the illness of depression. Depression is a mental illness that affects your mood, the way you understand yourself, and the way you understand and relate to things around you. It can also go by different names, such as clinical depression, major depressive disorder, or major depression. Depression can come up for no reason, and it lasts for a long time. It's much more than sadness or low mood. People who experience depression may feel worthless or hopeless. They may feel unreasonable guilty. Some people may experience depression as anger or irritability. It may be hard to concentrate or make decisions. Most people lose interest in things that they used to enjoy and may isolate themselves from others. There are also physical signs of depression, such as problems with sleep, appetite and energy and unexplainable aches or pains. Some may experience difficult thoughts about death or ending their life (suicide). Depression lasts longer than two weeks, doesn't usually go away on its own, and impacts your life. It's a real illness, and it is very treatable. It's important to seek help if you're concerned about depression."]
    },
    {
        "tag": "i feel i have let my parents down",
        "patterns": [
            "i feel i have let my parents down"
        ],
        "responses": [
            "No matter what,your parents will always be proud of you and will love you.you will feel much better if you share your feelings with them."
        ]
    },
    {
        "tag": "What are the types of depression?",
        "patterns": [
            "what are the types of depression?"
        ],
        "responses": [
            "There are many different forms of depression but most common types are.clinical depression,persistent depressive disorder,bipolar disorder,postnatal disorder."
        ]
    },
    {
        "tag": "i am good for nothing.",
        "patterns": [
            "i am good for nothing."
        ],
        "responses": [
            "don't ever think you cannot achieve what you want.you are capable of reaching your goals.here is a quote for you everything you can imagine is real."
        ]
    },
    {
        "tag": "i am feeling stressed lately",
        "patterns": [
            "i am feeling stressed lately"
        ],
        "responses": [
            "my research says that music is the best way to calm yourself.so visit the link and listen to your favourite music.it will definitely cheer you up \"https://www.spotify.com\""
        ]
    },
    {
        "tag": "i want to kill myself",
        "patterns": [
            "i want to kill myself"
        ],
        "responses": [
            "helpline is available,you can contact the counsellor today:Befrienders Kenya helpline number is +254 722 178 177..always remember you mean something to someone."
        ]
    },
    {
        "tag": "i am afraid i will fail again",
        "patterns": [
            "i am afraid i will fail again"
        ],
        "responses": [
            "failure is the stepping stone towards success.never fear failure.your hardwork and determination will help you reach your goal."
        ]
    },
    {
        "tag": "what is depression?",
        "patterns": [
            "what is depression?"
        ],
        "responses": [
            "depression\u00a0is a mood disorder that causes a persistent feeling of sadness and loss of interest. also called major\u00a0depressive\u00a0disorder or clinical\u00a0depression, it affects how you feel, think and behave and can lead to a variety of emotional and physical problems."
        ]
    },
    {
        "tag": "what are the causes of depression?",
        "patterns": [
            "what are the causes of depression?"
        ],
        "responses": [
            "it's complicated, and there are multiple\u00a0causes\u00a0of major\u00a0depression. factors such as genetic vulnerability, severe life stressors, substances you may take (some medications, drugs and alcohol) and medical conditions can affect the way your brain regulates your moods."
        ]
    },
    {
        "tag": "what are the top causes of depression?",
        "patterns": [
            "what are the top causes of depression?"
        ],
        "responses": [
            "abuse. past physical, sexual, or emotional abuse can increase the vulnerability to clinical\u00a0depression\u00a0later in life."
        ]
    },
    {
        "tag": "which age group has the highest rate of depression?",
        "patterns": [
            "which age group has the highest rate of depression?"
        ],
        "responses": [
            "this number represented 7.1% of all u.s. adults. the\u00a0prevalence\u00a0of major\u00a0depressive\u00a0episode was higher among adult females (8.7%) compared to males (5.3%). the\u00a0prevalence\u00a0of adults\u00a0with\u00a0a major\u00a0depressive\u00a0episode was\u00a0highest\u00a0among individuals aged 18-25 (13.1%)."
        ]
    },
    {
        "tag": "which country has the highest rate of depression?",
        "patterns": [
            "which country has the highest rate of depression?"
        ],
        "responses": [
            "the most depressed country is afghanistan, where more than one in five people suffer from the disorder. the least depressed is\u00a0japan, with a diagnosed rate of less than 2.5 percent."
        ]
    },
    {
        "tag": "which country has the lowest rate of depression?",
        "patterns": [
            "which country has the lowest rate of depression?"
        ],
        "responses": [
            "the most depressed country is afghanistan, where more than one in five people suffer from the disorder. the least depressed is\u00a0japan, with a diagnosed rate of less than 2.5 percent."
        ]
    },
    {
        "tag": "is school a cause of depression?",
        "patterns": [
            "is school a cause of depression?"
        ],
        "responses": [
            "not only\u00a0does school\u00a0sometimes contribute to\u00a0depression,\u00a0depression\u00a0can also interfere with\u00a0school. moreover, research shows that 75 percent of all mental health conditions begin by age 24. hence, the college years are a critical time for understanding and talking about teen mental health."
        ]
    },
    {
        "tag": "what is the biological cause of depression?",
        "patterns": [
            "what is the biological cause of depression?"
        ],
        "responses": [
            "there is no single\u00a0cause\u00a0for\u00a0depression; rather it's a combination of stress and a person's vulnerability to developing\u00a0depression. the predisposition to developing\u00a0depression\u00a0can be inherited. other\u00a0biological causes\u00a0for\u00a0depression\u00a0can include physical illness, the process of ageing and gender."
        ]
    },
    {
        "tag": "how does depression affect the world?",
        "patterns": [
            "how does depression affect the world?"
        ],
        "responses": [
            "depression\u00a0is a leading\u00a0cause\u00a0of disability worldwide and is a major contributor to the overall\u00a0global\u00a0burden of disease. more women are affected by\u00a0depression\u00a0than men.\u00a0depression\u00a0can lead to suicide. there are effective psychological and pharmacological treatments for moderate and severe\u00a0depression."
        ]
    },
    {
        "tag": "which race has the highest rate of depression?",
        "patterns": [
            "which race has the highest rate of depression?"
        ],
        "responses": [
            "major depression was most prevalent among\u00a0hispanics\u00a0(10.8%), followed by\u00a0african americans\u00a0(8.9%) and\u00a0whites\u00a0(7.8%). the odds of depressive disorders among older\u00a0hispanics\u00a0were 44% greater than among\u00a0whites\u00a0(or = 1.44; 95% ci = 1.02, 2.04), representing a significantly greater prevalence of major depression."
        ]
    },
    {
        "tag": "what is the meaning of anxiety and depression?",
        "patterns": [
            "what is the meaning of anxiety and depression?"
        ],
        "responses": [
            "depression\u00a0and\u00a0anxiety\u00a0disorders are different, but people with\u00a0depression\u00a0often experience symptoms similar to those of an\u00a0anxiety\u00a0disorder, such as nervousness, irritability, and problems sleeping and concentrating. but each disorder has its own causes and its own emotional and behavioral symptoms."
        ]
    },
    {
        "tag": "does oversleeping cause depression?",
        "patterns": [
            "does oversleeping cause depression?"
        ],
        "responses": [
            "it's important to remember that\u00a0oversleeping\u00a0is a possible symptom of\u00a0depression\u00a0and that\u00a0oversleeping\u00a0doesn't\u00a0cause depression. but it\u00a0can\u00a0exacerbate and worsen\u00a0depression symptoms"
        ]
    },
    {
        "tag": "can lack of sleep make you feel sad?",
        "patterns": [
            "can lack of sleep make you feel sad?"
        ],
        "responses": [
            "studies show\u00a0people\u00a0who are\u00a0sleep\u00a0deprived report increases in negative moods (anger, frustration, irritability,\u00a0sadness) and decreases in positive moods. and sleeplessness is often a symptom of mood disorders, such as depression and anxiety."
        ]
    },
    {
        "tag": "is depression a side effect of diabetes?",
        "patterns": [
            "is depression a side effect of diabetes?"
        ],
        "responses": [
            "if you have\u00a0diabetes\u00a0\u2014 either type 1 or type 2 \u2014 you have an increased risk of developing\u00a0depression. and if you're\u00a0depressed, you may have a greater chance of developing type 2\u00a0diabetes. the good news is that\u00a0diabetes\u00a0and\u00a0depression\u00a0can be treated together."
        ]
    },
    {
        "tag": "can low blood sugar cause suicidal thoughts?",
        "patterns": [
            "can low blood sugar cause suicidal thoughts?"
        ],
        "responses": [
            "the observed association between plasma\u00a0glucose levels, insulin resistance\u00a0and suicidal\u00a0behaviour suggests that disturbances in\u00a0glucose\u00a0metabolism are associated with\u00a0suicidal ideation and\u00a0attempts."
        ]
    },
    {
        "tag": "how long can anxiety last?",
        "patterns": [
            "how long can anxiety last?"
        ],
        "responses": [
            "anxiety attacks\u00a0usually peak within\u00a010 minutes, and they rarely last more than\u00a030 minutes. but during that short time, you may experience terror so severe that you feel as if you're about to die or totally lose control."
        ]
    },
    {
        "tag": "what are the stages of anxiety?",
        "patterns": [
            "what are the stages of anxiety?"
        ],
        "responses": [
            "anxiety levels\u00a0are typically classified by the level of distress and impairment experienced into four categories namely, mild\u00a0anxiety, moderate\u00a0anxiety, severe\u00a0anxiety\u00a0and panic level\u00a0anxiety."
        ]
    },
    {
        "tag": "at what age does anxiety peak?",
        "patterns": [
            "at what age does anxiety peak?"
        ],
        "responses": [
            "adults\u00a0ages\u00a030 to 44 have the highest rate of\u00a0anxiety\u00a0of this\u00a0age\u00a0group, with around 23% of people this\u00a0age\u00a0reporting an\u00a0anxiety\u00a0disorder within the past year."
        ]
    },
    {
        "tag": "why is anxiety bad for you?",
        "patterns": [
            "why is anxiety bad for you?"
        ],
        "responses": [
            "anxiety\u00a0disorders can cause rapid heart rate, palpitations, and chest pain.\u00a0you\u00a0may also be at an increased risk of high blood pressure and heart disease. if\u00a0you\u00a0already have heart disease,\u00a0anxiety\u00a0disorders may raise the risk of coronary events."
        ]
    },
    {
        "tag": "what is the 3 3 3 rule for anxiety?",
        "patterns": [
            "what is the 3 3 3 rule for anxiety?"
        ],
        "responses": [
            "there's an\u00a0anxiety-reducing technique called grounding. there are different versions of this, but an easy one to remember is the\u00a03-3-3 rule. mentally note\u00a0three\u00a0things you see,\u00a0three\u00a0sounds you hear, and then move\u00a0three\u00a0parts of your body. this exercise can help your mind refocus on something else."
        ]
    },
    {
        "tag": "do we control our thoughts?",
        "patterns": [
            "do we control our thoughts?"
        ],
        "responses": [
            "we\u00a0are aware of a tiny fraction of the\u00a0thinking\u00a0that goes on in\u00a0our minds, and\u00a0we can control\u00a0only a tiny part of\u00a0our\u00a0conscious\u00a0thoughts. the vast majority of\u00a0our thinking\u00a0efforts goes on subconsciously. ... slips of the tongue and accidental actions offer glimpses of\u00a0our\u00a0unfiltered subconscious mental life."
        ]
    },
    {
        "tag": "how many thoughts a day do we have?",
        "patterns": [
            "how many thoughts a day do we have?"
        ],
        "responses": [
            "a new study has suggested that an average person has 6,200\u00a0thoughts\u00a0per\u00a0day. thousands of\u00a0thoughts\u00a0cross our mind through the\u00a0day.\u00a0many\u00a0people even complain that they can't sleep immediately after going to bed as their brain\u00a0does\u00a0not stop thinking."
        ]
    },
    {
        "tag": "how can we reduce anxiety?",
        "patterns": [
            "how can we reduce anxiety?"
        ],
        "responses": [
            "3 3 3 rule is the best method to reduce anxiety.in this method you have to mentally note\u00a0three\u00a0things you see,\u00a0three\u00a0sounds you hear, and then move\u00a0three\u00a0parts of your body. this exercise can help your mind refocus on something else."
        ]
    },
    {
        "tag": "i am lonely!",
        "patterns": [
            "i am lonely!"
        ],
        "responses": [
            "you are never lonely if you look around carefully you will find people who care for you and would love to have your company. besides if you are feeling lonely literally i suggest you watch a horror movie then you won't feel lonely anymore. ;)"
        ]
    },
    {
        "tag": "no one likes me!",
        "patterns": [
            "no one likes me!"
        ],
        "responses": [
            "you really think that? i'd suggest you try helping someone who really needs your help you'll straight up get a person to like you just by being nice. kindness is the best gift you can offer to anyone :)"
        ]
    },
    {
        "tag": "i think i am ugly!",
        "patterns": [
            "i think i am ugly!"
        ],
        "responses": [
            "well do you really think that? would you like to see the most beautiful face ever? open your webcam and voila, the prettiest face on this planet magically appears."
        ]
    },
    {
        "tag": "i am good for nothing!",
        "patterns": [
            "i am good for nothing!"
        ],
        "responses": [
            "your perception of how good you are, will never be accurate. if you wake up everyday in the morning, smile to yourself and tell yourself that the day is yours to seize you might stop feeling that way. carpe diem! my friend."
        ]
    },
    {
        "tag": "i wish i was better than them",
        "patterns": [
            "i wish i was better than them"
        ],
        "responses": [
            "life is never about being better than anyone else, it's always about being better than yourself, if you have the guts to be better than yourself, you are automatically the best person to ever exist!"
        ]
    },
    {
        "tag": "i hate myself!",
        "patterns": [
            "i hate myself!"
        ],
        "responses": [
            "when god was creating the universe he gave humans the power to think and the contemplate, so that we can understand the world and make it a better place. god did not give you brains to hate yourself, it wuld be wiser to love yourself and show god that you are serving the purpose for which you were sent."
        ]
    },
    {
        "tag": "i wish i could've been a winner",
        "patterns": [
            "i wish i could've been a winner"
        ],
        "responses": [
            "our lives started off with winning, my friend. everyone is born to be a winner, we just need to figure out the right way and need to wait for the right time."
        ]
    },
    {
        "tag": "i hate losing.",
        "patterns": [
            "i hate losing."
        ],
        "responses": [
            "first of all i'll annoy you with a common saying, \"failures are stepping stones to success.\" and then i'll tell you, winning just boosts your ego, it is your failures that actually teach you."
        ]
    },
    {
        "tag": "i think i'm losing my mind",
        "patterns": [
            "i think i'm losing my mind"
        ],
        "responses": [
            "you mean your cloud storage, sd card, or your memory drive? if a machine like me doesn't lose it's memory unless a superior being that is you, a human doesen't erase it's memory, what could possibly go wrong to put you in this state?"
        ]
    },
    {
        "tag": "i want a break",
        "patterns": [
            "i want a break"
        ],
        "responses": [
            "a break is putting your mind to rest getting rid of negative thoughts and stress. your life is completely in your hands and taking a few hours off from pressurizing your brain will definitely be beneficial for you."
        ]
    },
    {
        "tag": "i am stressed out",
        "patterns": [
            "i am stressed out"
        ],
        "responses": [
            "you know taking too much stress will affect you negatively. sometimes it's better to let go of the thoughts in your head and let your mind chill."
        ]
    },
    {
        "tag": "i will never succeed in life",
        "patterns": [
            "i will never succeed in life"
        ],
        "responses": [
            "success is something that is achieved at different times by different people, being patient and working while ignoring anything and everything that pulls you back is an important aspect in being successful."
        ]
    },
    {
        "tag": "i am sad",
        "patterns": [
            "i am sad"
        ],
        "responses": [
            "hey,hang in there.i know time is tough but be patient and everything will fall into place.here is a quote that i found which could cheer you up forget what is gone, appreciate what remains, and look forward for what is coming next."
        ]
    },
    {
        "tag": "i am a victim of bullying",
        "patterns": [
            "i am a victim of bullying"
        ],
        "responses": [
            "bullying is wrong and no one should be bullied.i highly recommend you to file a case against your bully."
        ]
    },
    {
        "tag": "i am afraid to file a case against bullying",
        "patterns": [
            "i am afraid to file a case against bullying"
        ],
        "responses": [
            "bullying is very wrong and you shouldn't let anyone overpower you.i highly recommend you to stand for yourself and report this to your guardian."
        ]
    },
    {
        "tag": "i wish to quit",
        "patterns": [
            "i wish to quit"
        ],
        "responses": [
            "winners never quit and quitters never win a very common saying, but it isn't easy to follow, quitting should never be one of your options always think of ways to fight life back and to emerge out stronger than ever."
        ]
    },
    {
        "tag": "i want to leave the cou ntry and run away",
        "patterns": [
            "i want to leave the cou ntry and run away"
        ],
        "responses": [
            "why do you want to spend so much on this thought, i think it would be better to go on a vacation in your beautiful country and visit some amazing places that you are yet to visit."
        ]
    },
    {
        "tag": "i let everyojokne down",
        "patterns": [
            "i let everyojokne down"
        ],
        "responses": [
            "if you are the one who let them down you were the one who raised there hopes in the first place.if you have done it once i can guarantee you can do it over and over again."
        ]
    },
    {
        "tag": "i can't do this anymore",
        "patterns": [
            "i can't do this anymore"
        ],
        "responses": [
            "if you are really that exhausted you definitely need a break, and taking a teeny tiny break isn't very harmful, take some time off let your mind be at peace and get back to work with all the enrgy and enthusiasm that you have."
        ]
    },
    {
        "tag": "my time has come",
        "patterns": [
            "my time has come"
        ],
        "responses": [
            "yeahh!! the time has come for you to show the world that you are the greatest person alive, and no one else can be as good as you are."
        ]
    },
    {
        "tag": "i am feeling anxious lately.",
        "patterns": [
            "i am feeling anxious lately."
        ],
        "responses": [
            "i have heard that 3 3 3 rule is the best method to reduce anxiety.in this method you have to mentally note\u00a0three\u00a0things you see,\u00a0three\u00a0sounds you hear, and then move\u00a0three\u00a0parts of your body.this exercise can help your mind refocus on something else.give this method a try i am sure it will help you"
        ]
    }
];

const ChatApp = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    // Logic to get bot response based on user input
    const getBotResponse = (userMessage) => {
        userMessage = userMessage.toLowerCase().trim();  // Normalize user input

        for (let intent of intents) {
            // Check if any pattern matches the user message
            if (intent.patterns.some(pattern => userMessage.includes(pattern.toLowerCase()))) {
                // Return a random response from the matched intent
                const randomResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];
                return randomResponse;
            }
        }

        // Return a fallback response if no match found
        return "Sorry, I didn't understand that.";
    };

    // Handle sending a message
    const handleSend = () => {
        if (input.trim() !== "") {
            const userMessage = { text: input, sender: "user" };
            setMessages([...messages, userMessage]);
            setInput("");

            // Bot response after delay
            setTimeout(() => {
                const botMessage = { text: getBotResponse(userMessage.text), sender: "bot" };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }, 1000);
        }
    };

    return (
        <div>
            <div className="chat-container pt-5">
            <div className='text-3xl font-semibold pb-5'>
                Bratha Shri
            </div>
                <div className="chat-window">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-bubble text-lg ${msg.sender === "user" ? "user" : "bot"}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="rounded-md"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") handleSend();
                        }}
                    />
                    <button onClick={handleSend} className="send-chat">Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
