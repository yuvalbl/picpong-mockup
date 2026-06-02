# Picpong — User Flows (Phase 3, fast-track)

> Four core flows from `redesign-plan.md` §5.4, adapted to cartonlab's dual-funnel model + our real commerce.
> **Last updated:** 2026-05-31

## (a) Buy a stock product

```mermaid
flowchart LR
  H[Home: Shop lane] --> C[Category landing]
  C -->|filter/grid| P[Product detail]
  P -->|pick variant + qty| A{Customize?}
  A -->|no| Cart[Add to cart]
  A -->|yes: upload artwork| T[Choose Print option -> get templates] --> Cart
  Cart --> CO[Checkout: Stripe]
  CO --> OK[Order confirmation + admin notify]
```

## (b) Request quote for custom job

```mermaid
flowchart LR
  H[Home: Project lane] --> P[Product detail or Projects]
  P -->|"Tell us about your project"| Q[Structured quote form]
  Q --> CRM[Route to CRM + email]
  CRM --> R[Sales follow-up]
```

## (c) Browse case study → enquiry

```mermaid
flowchart LR
  H[Home / Projects] --> G[Project gallery: filter Events/Exhibitions/Booths]
  G --> D[Project detail: credits + narrative + named client]
  D -->|related projects| G
  D -->|"Got an idea? Let's make it real"| Q[Quote/contact form]
```

## (d) Download catalog → email capture

```mermaid
flowchart LR
  Any[Any page] --> Cat[Catalogs page]
  Cat -->|request download| E[Email capture / newsletter opt-in]
  E --> PDF[Deliver catalog PDF + nurture]
```

**Shared closing CTA** (cartonlab style): one consistent line — e.g. *"Got an idea? Let's make it real."* — on PDPs, projects, and footer.
