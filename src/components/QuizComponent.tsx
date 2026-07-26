"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Award, HelpCircle, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

export interface QuizOptionData {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizQuestionData {
  id: string;
  prompt: string;
  hanzi?: string | null;
  pinyin?: string | null;
  explanation?: string | null;
  options: QuizOptionData[];
}

export interface QuizData {
  id: string;
  title: string;
  description?: string | null;
  passingScore: number;
  questions: QuizQuestionData[];
}

interface QuizComponentProps {
  quiz: QuizData;
  onComplete?: (score: number, passed: boolean) => void;
}

export default function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
    correctCount: number;
    totalQuestions: number;
  } | null>(null);

  const questions = quiz.questions;
  const currentQuestion = questions[currentStep];

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/quizzes/${quiz.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: userAnswers }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des réponses.");
      }

      const data = await response.json();
      setResult(data);
      setIsSubmitted(true);
      if (onComplete) {
        onComplete(data.score, data.passed);
      }
    } catch (error) {
      console.error("[QUIZ_SUBMIT_CLIENT_ERROR]", error);
      alert("Erreur lors de la soumission du quizz.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setResult(null);
    setCurrentStep(0);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
        <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="font-bold text-slate-800 text-lg">Quizz en cours de préparation</h3>
        <p className="text-slate-400 text-xs mt-1">Le coach ajoutera des questions sous peu !</p>
      </div>
    );
  }

  // Result view after submission
  if (isSubmitted && result) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center space-y-6 animate-fadeIn">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 border border-slate-100 shadow-inner">
          {result.passed ? (
            <Award className="w-10 h-10 text-amber-500" />
          ) : (
            <RotateCcw className="w-10 h-10 text-slate-400" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">
            {result.passed ? "Félicitations ! 🎉" : "Presque réussi ! 💪"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {result.passed
              ? "Vous avez validé cet exercice avec succès !"
              : `Vous devez obtenir au moins ${quiz.passingScore}% pour valider le quizz.`}
          </p>
        </div>

        {/* Score Badge */}
        <div className="max-w-xs mx-auto p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-3xl font-black text-[#FA4949]">{result.score}%</div>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {result.correctCount} bonne(s) réponse(s) sur {result.totalQuestions}
          </p>
        </div>

        {/* Answers recap */}
        <div className="text-left space-y-4 pt-4 border-t border-slate-100">
          <h4 className="font-bold text-slate-800 text-sm">Récapitulatif des réponses :</h4>
          {questions.map((q, idx) => {
            const selectedOptId = userAnswers[q.id];
            const selectedOpt = q.options.find((o) => o.id === selectedOptId);
            const correctOpt = q.options.find((o) => o.isCorrect);
            const isCorrect = selectedOptId === correctOpt?.id;

            return (
              <div key={q.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex justify-between items-start gap-2">
                  <div className="font-semibold text-slate-800">
                    {idx + 1}. {q.prompt}
                    {q.hanzi && <span className="ml-2 font-bold text-[#FA4949]">{q.hanzi}</span>}
                    {q.pinyin && <span className="ml-1 text-slate-400 font-normal">({q.pinyin})</span>}
                  </div>
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-bold shrink-0">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="text-slate-600">
                  <span>Votre réponse : </span>
                  <span className={isCorrect ? "font-bold text-emerald-600" : "font-bold text-red-500"}>
                    {selectedOpt?.text || "Aucune réponse"}
                  </span>
                </div>

                {!isCorrect && correctOpt && (
                  <div className="text-slate-600">
                    <span>Bonne réponse : </span>
                    <span className="font-bold text-emerald-600">{correctOpt.text}</span>
                  </div>
                )}

                {q.explanation && (
                  <div className="text-slate-500 bg-blue-50/50 p-2 rounded-lg text-[11px] border border-blue-100/50">
                    💡 Explication : {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="btn-primary px-6 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Réessayer le Quizz
        </button>
      </div>
    );
  }

  const isSelected = (optId: string) => userAnswers[currentQuestion.id] === optId;
  const isAllAnswered = questions.every((q) => !!userAnswers[q.id]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FA4949] bg-red-50 px-2.5 py-0.5 rounded-full">
              Quizz de Révision 📝
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Question {currentStep + 1} sur {questions.length}
            </span>
          </div>
          <h3 className="font-extrabold text-slate-800 text-lg mt-1">{quiz.title}</h3>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium">Seuil de réussite :</span>
          <span className="text-xs font-bold text-emerald-600 ml-1">{quiz.passingScore}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-[#FA4949] h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          {/* Hanzi / Pinyin Prominent Box if present */}
          {(currentQuestion.hanzi || currentQuestion.pinyin) && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-1">
              {currentQuestion.hanzi && (
                <div className="text-3xl font-black text-[#0A083B] tracking-wider">{currentQuestion.hanzi}</div>
              )}
              {currentQuestion.pinyin && (
                <div className="text-sm font-medium text-[#FA4949]">{currentQuestion.pinyin}</div>
              )}
            </div>
          )}

          <h4 className="text-base font-bold text-slate-800">{currentQuestion.prompt}</h4>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQuestion.options.map((opt) => {
            const selected = isSelected(opt.id);

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                className={`p-4 rounded-xl text-left border font-semibold text-sm transition-all flex items-center justify-between ${
                  selected
                    ? "bg-red-50/60 border-[#FA4949] text-[#FA4949] shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <span>{opt.text}</span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selected ? "border-[#FA4949] bg-[#FA4949] text-white" : "border-slate-300"
                  }`}
                >
                  {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation & Submit controls */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-full text-xs font-bold border transition ${
            currentStep === 0
              ? "border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Précédent
        </button>

        {currentStep < questions.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!userAnswers[currentQuestion.id]}
            className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
              !userAnswers[currentQuestion.id]
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "btn-primary"
            }`}
          >
            Suivant
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmitQuiz}
            disabled={!isAllAnswered || submitting}
            className={`px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition ${
              !isAllAnswered || submitting
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "btn-primary shadow-md"
            }`}
          >
            {submitting ? (
              "Evaluation..."
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Valider le Quizz
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
