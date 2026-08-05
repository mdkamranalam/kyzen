import Container from "./container";

export default function Features() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="mb-8 text-3xl font-bold">Features</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">Organizations</div>

          <div className="rounded-xl border p-6">AI Assistant</div>

          <div className="rounded-xl border p-6">Kanban Boards</div>
        </div>
      </Container>
    </section>
  );
}
