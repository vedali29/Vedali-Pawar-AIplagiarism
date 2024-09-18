import React, { useRef, useState } from 'react';
import { Button } from "./Button";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Progress } from "./Progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";
import { FileText, Upload, Check, Menu, Star, Zap, Shield, Instagram, Twitter, Download, Facebook } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "./Alert";



export default function LandingPage() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [flaggedSections, setFlaggedSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputError, setInputError] = useState(null);
    const fileInputRef = useRef(null);



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFile(selectedFile);
            setText(''); // Clear text input when file is selected
        } else {
            alert('Please upload a PDF or Word document.');
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };


    const handleTextChange = (e) => {
        setText(e.target.value);
        setFile(null); // Clear file input when text is entered
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    const handleSubmit = async () => {
        setInputError(null);
        setError(null);


        if (!text.trim() && !file) {
            setInputError('Please provide either text or a file to check.');
            return;
        }


        setIsLoading(true);
        const formData = new FormData();



        if (file) {
            formData.append('file', file);
        } else if (text.trim()) {
            formData.append('text', text.trim());
        }


        try {
            const response = await fetch('http://localhost:5000/api/check', {
                method: 'POST',
                body: formData,
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            const data = await response.json();
            setResult(data.similarity);
            setFlaggedSections(data.flaggedSections);
        } catch (error) {
            console.error('Error checking plagiarism:', error);
            setError('An error occurred while checking for plagiarism. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    const handleDownloadReport = () => {
        if (!result || !flaggedSections) {
            console.error('No report data available');
            return;
        }


        const report = `
Plagiarism Report
-----------------
Overall Similarity: ${result}%


Flagged Sections:
${flaggedSections.map((section, index) =>
            `${index + 1}. "${section.text}" - ${section.similarity}% similar`
        ).join('\n')}
        `;


        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'plagiarism_report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);


        // Reset the form after downloading
        resetForm();
    };


    const resetForm = () => {
        setFile(null);
        setText('');
        setResult(null);
        setFlaggedSections([]);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    return (
        <div className="min-h-screen bg-black text-white flex flex-col m-16 t-0 z-50">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white sticky top-0 z-50">
                <div className="text-2xl font-bold">VipePlagiarism</div>
                <div className="hidden md:flex space-x-4">
                    <a href="#features" className="hover:underline">Features</a>
                    <a href="#how-it-works" className="hover:underline">How It Works</a>
                    <a href="#why-choose-us" className="hover:underline">Why Choose Us</a>
                    <a href="#faq" className="hover:underline">FAQ</a>
                </div>
                <Button variant="outline" className="md:hidden"><Menu /></Button>
            </nav>


            <div className="h-4 bg-white"></div>


            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gradient-to-b  from-gray-900 to-black">
                <div className="md:w-1/2 space-y-10">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 h-56">
                        Get Ready to Remove Plagiarism, Save Your Time and Effort 🚀
                    </h1>
                    <p className="text-xl">Level up your academic game with our lit plagiarism detection tool. No cap, just facts! 💯</p>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition duration-300">
                        <a href='#plagiarism' className="ml-2">Get Started - It's Free!</a>
                    </Button>
                </div>
            </section>


            {/* Features Section */}
            <section id="features" className="p-8 md:p-16 bg-white text-black">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Features that Slay 🔥</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4 bg-gray-100 p-6 rounded-lg transform hover:scale-105 transition duration-300">
                        <FileText size={48} className="text-purple-500" />
                        <h3 className="text-xl font-semibold">Multiple File Formats</h3>
                        <p>We've got you covered - PDF, DOC, TXT, you name it!</p>
                    </div>
                    <div className="space-y-4 bg-gray-100 p-6 rounded-lg transform hover:scale-105 transition duration-300">
                        <Upload size={48} className="text-pink-500" />
                        <h3 className="text-xl font-semibold">Bulk Upload</h3>
                        <p>Check all your docs at once. Time is money, friend! 💸</p>
                    </div>
                    <div className="space-y-4 bg-gray-100 p-6 rounded-lg transform hover:scale-105 transition duration-300">
                        <Check size={48} className="text-green-500" />
                        <h3 className="text-xl font-semibold">Detailed Reports</h3>
                        <p>Get the tea on every sus sentence. We spill it all! ☕</p>
                    </div>
                </div>
            </section>


            {/* How It Works Section */}
            <section id="how-it-works" className="p-8 md:p-16 bg-gradient-to-b from-gray-900 to-black">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">How It Works - Easy Peasy 🍋</h2>
                <div className="space-y-8">
                    <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-2xl">1</div>
                        <p className="text-xl">Drop your doc or paste your text like it's hot 🔥</p>
                    </div>
                    <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-2xl">2</div>
                        <p className="text-xl">Our AI does its magic faster than you can say "yeet" 🧙‍♂️</p>
                    </div>
                    <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-2xl">3</div>
                        <p className="text-xl">Get your results and flex that originality 💪</p>
                    </div>
                </div>
            </section>


            {/* Why Choose Us Section */}
            <section id="why-choose-us" className="p-8 md:p-16 bg-white text-black">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why We're the GOAT 🐐</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4 text-center">
                        <Zap size={48} className="mx-auto text-yellow-500" />
                        <h3 className="text-xl font-semibold">Lightning Fast</h3>
                        <p>Results quicker than your crush leaves you on read 😅</p>
                    </div>
                    <div className="space-y-4 text-center">
                        <Shield size={48} className="mx-auto text-blue-500" />
                        <h3 className="text-xl font-semibold">99.9% Accurate</h3>
                        <p>More precise than your mom finding stuff in your room 🕵️‍♀️</p>
                    </div>
                    <div className="space-y-4 text-center">
                        <Star size={48} className="mx-auto text-purple-500" />
                        <h3 className="text-xl font-semibold">User-Friendly AF</h3>
                        <p>Easier to use than making excuses for late homework 🤷‍♂️</p>
                    </div>
                </div>
            </section>


            {/* Plagiarism Checker Section */}
            <section id='plagiarism' className="p-8 md:p-16 bg-white text-black">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Check Your Vibe (and Your Doc) 📝</h2>
                <div className="space-y-4 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">PDF or Word (MAX. 10MB)</p>
                            </div>
                            <Input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                ref={fileInputRef}
                            />
                        </label>
                    </div>
                    {file && <p className="text-center">Selected file: {file.name}</p>}
                    <p className="text-center font-bold">- OR -</p>
                    <Textarea
                        placeholder="Paste your text here... We don't judge, we just check 😉"
                        value={text}
                        onChange={handleTextChange}
                        rows={6}
                        className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Checking...' : 'Check for Plagiarism'}
                    </Button>
                </div>
                {inputError && (
                    <Alert className="mt-4 bg-yellow-100 border-yellow-400 text-yellow-700">
                        <AlertTitle>Input Required</AlertTitle>
                        <AlertDescription>{inputError}</AlertDescription>
                    </Alert>)}


                {error && (
                    <Alert className="mt-4 bg-red-100 border-red-400 text-red-700">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {result !== null && (
                    <div className="mt-8 space-y-4 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-semibold text-center">The Verdict Is In! 🥁</h3>
                        <Progress value={result} className="w-full h-6 bg-gray-200" />
                        <p className="text-xl text-center">
                            {result}% of your document is giving us déjà vu vibes.
                            {result < 20 ? " You're killin' it! 🔥" : result < 50 ? " Not bad, but there's room for improvement! 💪" : " Oof, time for a rewrite, bestie! 😬"}
                        </p>
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Flagged Sections:</h4>
                            {flaggedSections.map((section, index) => (
                                <Alert key={index}>
                                    <AlertTitle>Similarity: {section.similarity}%</AlertTitle>
                                    <AlertDescription>"{section.text}"</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                        <Button onClick={handleDownloadReport} className="w-full bg-green-500 hover:bg-green-600">
                            <Download className="mr-2 h-4 w-4" /> Download Full Report
                        </Button>
                        <Button onClick={resetForm} className="w-full bg-gray-500 hover:bg-gray-600">
                            Check Another Document
                        </Button>
                    </div>
                )}
            </section>


            {/* Testimonials Section */}
            <section className="p-8 md:p-16 bg-gradient-to-b from-gray-900 to-black">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Tea from Our Users ☕</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <p className="text-lg mb-4">"This tool is the real MVP! Saved my essay and my GPA. 10/10 would recommend! 🏆"</p>
                        <p className="font-bold">- Sarah, College Sophomore</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <p className="text-lg mb-4">"No cap, this plagiarism checker is bussin'. My papers are always original now! 💯"</p>
                        <p className="font-bold">- Mike, High School Senior</p>
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section id="faq" className="p-8 md:p-16 bg-gradient-to-b from-gray-900 to-black">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">FAQs (aka Things You're Too Afraid to Ask) 🙈</h2>
                <Accordion type="single" collapsible className="max-w-2xl mx-auto">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it really free?</AccordionTrigger>
                        <AccordionContent>
                            Yep, it's free like water from the fountain! We've got premium features too if you're feeling fancy. 💎
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How accurate is it?</AccordionTrigger>
                        <AccordionContent>
                            We're talking 99.9% accurate. It's like your phone's autocorrect, but actually helpful. 📱✨
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can my teacher tell I used this?</AccordionTrigger>
                        <AccordionContent>
                            Nah, we're like Fight Club. The first rule is: you don't talk about PlagiarismGuard. 🤐
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>


            {/* Footer */}
            <footer className="bg-black text-white p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="text-2xl font-bold mb-4 md:mb-0">VipePlagiarism</div>
                    <div className="flex space-x-4">
                        <a href="/privacy-policy" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
                        <a href="/terms-of-service" className="hover:text-purple-500 transition duration-300">Terms of Service</a>
                        <a href="/contact-us" className="hover:text-purple-500 transition duration-300">Contact Us</a>
                    </div>
                </div>
                <div className="flex justify-center space-x-6 mb-4">
                    <button className="text-gray-400 hover:text-white transition duration-300">
                        <Instagram size={24} />
                    </button>
                    <button className="text-gray-400 hover:text-white transition duration-300">
                        <Twitter size={24} />
                    </button>
                    <button className="text-gray-400 hover:text-white transition duration-300">
                        <Facebook size={24} />
                    </button>
                </div>


                <div className="text-center text-gray-400">
                    © {new Date().getFullYear()} VipePlagiarism. All rights reserved. Stay original, fam! ✌️
                </div>
            </footer>
        </div>
    );
}
