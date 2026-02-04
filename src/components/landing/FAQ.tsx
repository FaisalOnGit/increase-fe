import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Format proposal apa yang didukung?",
      answer: "Platform mendukung format PDF sesuai dengan pedoman resmi PKM."
    },
    {
      question: "Berapa ukuran maksimal file?",
      answer: "Ukuran maksimal file proposal adalah 10MB."
    },
    {
      question: "Apakah proposal bisa direvisi setelah upload?",
      answer: "Ya, revisi dapat dilakukan sebelum batas deadline."
    },
    {
      question: "Bisakah saya mengirim lebih dari satu proposal?",
      answer: "Bisa, selama sesuai dengan ketentuan program PKM."
    },
    {
      question: "Apakah data proposal aman?",
      answer: "Semua dokumen terenkripsi dan hanya dapat diakses oleh pihak terkait."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/30 to-background">
      <div className="container mx-auto px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-xl text-muted-foreground">
              Temukan jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border-2 border-amber-100 px-6 data-[state=open]:border-amber-300"
              >
                <AccordionTrigger className="text-left py-5 text-lg font-semibold hover:text-amber-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
