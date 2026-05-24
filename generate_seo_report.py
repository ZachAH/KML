from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)

# ── Brand Colors ──────────────────────────────────────────
BRAND_GREEN  = colors.HexColor("#014421")
DEEP_GREEN   = colors.HexColor("#01351d")
YELLOW       = colors.HexColor("#D4A800")
YELLOW_LIGHT = colors.HexColor("#FFF8DC")
LIGHT_GRAY   = colors.HexColor("#F4F4F0")
MID_GRAY     = colors.HexColor("#6B7B6B")
BORDER_GRAY  = colors.HexColor("#D8D8D0")
WHITE        = colors.white
BLACK        = colors.HexColor("#111D10")

OUTPUT = "/Users/zachhowell/Desktop/KMPC_SEO_Report.pdf"

# ── Document Setup ─────────────────────────────────────────
doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=letter,
    rightMargin=0.65 * inch,
    leftMargin=0.65 * inch,
    topMargin=0.5 * inch,
    bottomMargin=0.7 * inch,
)

W = letter[0] - 1.3 * inch  # usable width

# ── Styles ─────────────────────────────────────────────────
base = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, **kw)

styles = {
    "cover_company": S("cover_company",
        fontName="Helvetica-Bold", fontSize=11, textColor=YELLOW,
        spaceAfter=4, alignment=TA_CENTER, letterSpacing=2),

    "cover_title": S("cover_title",
        fontName="Helvetica-Bold", fontSize=28, textColor=WHITE,
        leading=34, spaceAfter=10, alignment=TA_CENTER),

    "cover_sub": S("cover_sub",
        fontName="Helvetica", fontSize=12, textColor=colors.HexColor("#C8E6C9"),
        spaceAfter=6, alignment=TA_CENTER, leading=18),

    "cover_date": S("cover_date",
        fontName="Helvetica", fontSize=10, textColor=colors.HexColor("#A5C8A5"),
        alignment=TA_CENTER),

    "section_label": S("section_label",
        fontName="Helvetica-Bold", fontSize=8, textColor=YELLOW,
        spaceBefore=22, spaceAfter=4, letterSpacing=1.5),

    "section_title": S("section_title",
        fontName="Helvetica-Bold", fontSize=17, textColor=BRAND_GREEN,
        spaceAfter=6, leading=22),

    "intro": S("intro",
        fontName="Helvetica", fontSize=10.5, textColor=MID_GRAY,
        leading=16, spaceAfter=12),

    "body": S("body",
        fontName="Helvetica", fontSize=10, textColor=BLACK,
        leading=15.5, spaceAfter=6),

    "body_bold": S("body_bold",
        fontName="Helvetica-Bold", fontSize=10, textColor=BLACK,
        leading=15.5, spaceAfter=4),

    "bullet": S("bullet",
        fontName="Helvetica", fontSize=10, textColor=BLACK,
        leading=15.5, spaceAfter=3, leftIndent=14, bulletIndent=0),

    "table_head": S("table_head",
        fontName="Helvetica-Bold", fontSize=9, textColor=WHITE,
        alignment=TA_LEFT, leading=13),

    "table_cell": S("table_cell",
        fontName="Helvetica", fontSize=9, textColor=BLACK,
        leading=13),

    "table_cell_bold": S("table_cell_bold",
        fontName="Helvetica-Bold", fontSize=9, textColor=BRAND_GREEN,
        leading=13),

    "table_cell_gray": S("table_cell_gray",
        fontName="Helvetica", fontSize=9, textColor=MID_GRAY,
        leading=13),

    "tag_green": S("tag_green",
        fontName="Helvetica-Bold", fontSize=8, textColor=BRAND_GREEN,
        leading=11),

    "tag_yellow": S("tag_yellow",
        fontName="Helvetica-Bold", fontSize=8, textColor=colors.HexColor("#7A5900"),
        leading=11),

    "caption": S("caption",
        fontName="Helvetica-Oblique", fontSize=8.5, textColor=MID_GRAY,
        leading=12, spaceAfter=8),

    "footer": S("footer",
        fontName="Helvetica", fontSize=8, textColor=MID_GRAY,
        alignment=TA_CENTER),

    "check_yes": S("check_yes",
        fontName="Helvetica-Bold", fontSize=10, textColor=colors.HexColor("#2E7D32"),
        leading=15),
    "check_no": S("check_no",
        fontName="Helvetica-Bold", fontSize=10, textColor=colors.HexColor("#C62828"),
        leading=15),

    "page_title": S("page_title",
        fontName="Helvetica-Bold", fontSize=20, textColor=WHITE,
        leading=26, spaceAfter=0, alignment=TA_LEFT),

    "toc_item": S("toc_item",
        fontName="Helvetica", fontSize=10.5, textColor=BRAND_GREEN,
        leading=18, spaceAfter=0),
}


# ── Helper Flowables ───────────────────────────────────────

def rule(color=BORDER_GRAY, thickness=0.5, space_before=4, space_after=10):
    return HRFlowable(width="100%", thickness=thickness, color=color,
                      spaceAfter=space_after, spaceBefore=space_before)

def sp(n=8):
    return Spacer(1, n)

def section_header(label, title):
    return [
        sp(6),
        Paragraph(label.upper(), styles["section_label"]),
        Paragraph(title, styles["section_title"]),
        rule(BRAND_GREEN, thickness=1.5, space_before=0, space_after=10),
    ]

def callout(text, bg=YELLOW_LIGHT, border=YELLOW):
    """Highlighted callout box."""
    t = Table([[Paragraph(text, styles["body"])]], colWidths=[W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("LEFTPADDING",  (0,0), (-1,-1), 12),
        ("RIGHTPADDING", (0,0), (-1,-1), 12),
        ("TOPPADDING",   (0,0), (-1,-1), 10),
        ("BOTTOMPADDING",(0,0), (-1,-1), 10),
        ("LINEBEFORETABLE", (0,0), (0,-1), 3, border),
    ]))
    return t

def green_callout(text):
    return callout(text, bg=colors.HexColor("#E8F5E9"), border=BRAND_GREEN)

def checklist_row(label, status, note):
    icon = "✓" if status else "✗"
    icon_style = styles["check_yes"] if status else styles["check_no"]
    return [
        Paragraph(icon, icon_style),
        Paragraph(label, styles["body_bold"]),
        Paragraph(note, styles["body"]),
    ]

def two_col_table(rows, col1_w=2.2*inch):
    col2_w = W - col1_w
    data = [[Paragraph(r[0], styles["body_bold"]),
             Paragraph(r[1], styles["body"])] for r in rows]
    t = Table(data, colWidths=[col1_w, col2_w])
    t.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING",  (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
        ("TOPPADDING",   (0,0), (-1,-1), 4),
        ("BOTTOMPADDING",(0,0), (-1,-1), 4),
        ("LINEBELOW", (0,0), (-1,-2), 0.4, BORDER_GRAY),
    ]))
    return t


# ── Page Templates (header/footer) ────────────────────────

def on_page(canvas, doc):
    canvas.saveState()
    pw, ph = letter

    # Top green bar
    canvas.setFillColor(BRAND_GREEN)
    canvas.rect(0, ph - 0.38 * inch, pw, 0.38 * inch, fill=1, stroke=0)
    canvas.setFillColor(YELLOW)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.drawString(0.65 * inch, ph - 0.24 * inch, "KETTLE MORAINE PROFESSIONAL CLEANERS")
    canvas.setFillColor(colors.HexColor("#A5D6A7"))
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(pw - 0.65 * inch, ph - 0.24 * inch, "SEO Implementation Report  •  May 2026")

    # Bottom bar
    canvas.setFillColor(LIGHT_GRAY)
    canvas.rect(0, 0, pw, 0.5 * inch, fill=1, stroke=0)
    canvas.setFillColor(MID_GRAY)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(0.65 * inch, 0.19 * inch, "Confidential — Prepared for Kettle Moraine Professional Cleaners")
    canvas.drawRightString(pw - 0.65 * inch, 0.19 * inch, f"Page {doc.page}")

    canvas.restoreState()

def on_cover(canvas, doc):
    canvas.saveState()
    pw, ph = letter
    # Full green background
    canvas.setFillColor(BRAND_GREEN)
    canvas.rect(0, 0, pw, ph, fill=1, stroke=0)
    # Yellow accent bar at very top
    canvas.setFillColor(YELLOW)
    canvas.rect(0, ph - 0.22 * inch, pw, 0.22 * inch, fill=1, stroke=0)
    # Yellow accent bar at bottom
    canvas.setFillColor(DEEP_GREEN)
    canvas.rect(0, 0, pw, 1.2 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#A5D6A7"))
    canvas.setFont("Helvetica", 8)
    canvas.drawString(0.65 * inch, 0.45 * inch,
                      "kmpc.netlify.app  •  (262) 334-1881  •  West Bend, WI  •  Since 1987")
    canvas.restoreState()


# ── Build Story ────────────────────────────────────────────
story = []


# ════════════════════════════════════════════════════════════
#  COVER PAGE
# ════════════════════════════════════════════════════════════

story.append(Spacer(1, 1.8 * inch))
story.append(Paragraph("KETTLE MORAINE PROFESSIONAL CLEANERS", styles["cover_company"]))
story.append(sp(14))
story.append(Paragraph("SEO Implementation\nReport", styles["cover_title"]))
story.append(sp(18))
story.append(Paragraph(
    "A full breakdown of every search engine optimization update\n"
    "made to your website — what was built, what was fixed,\n"
    "and why each piece matters for Google rankings.",
    styles["cover_sub"]
))
story.append(sp(8))
story.append(Paragraph("Prepared May 2026", styles["cover_date"]))
story.append(PageBreak())


# ════════════════════════════════════════════════════════════
#  PAGE 2 — EXECUTIVE SUMMARY
# ════════════════════════════════════════════════════════════

story += section_header("Overview", "Executive Summary")

story.append(Paragraph(
    "Your website was rebuilt with a focused SEO strategy to help Kettle Moraine Professional Cleaners "
    "rank for the specific services you offer and the specific communities you serve across southeastern "
    "Wisconsin. Below is every change made, organized by category, with plain-language explanations of "
    "why each one matters.",
    styles["intro"]
))

story.append(sp(4))
story.append(callout(
    "<b>The core problem we solved:</b> Your old website had a single page describing all your services. "
    "Google can only rank one URL for one topic — meaning your carpet cleaning, tile cleaning, and "
    "commercial programs were all competing against each other and none of them stood out. "
    "We gave each service its own dedicated page so Google can rank each one independently."
))
story.append(sp(12))

# Summary stat boxes
stat_data = [
    [
        Table([[Paragraph("3", ParagraphStyle("n", fontName="Helvetica-Bold",
               fontSize=36, textColor=BRAND_GREEN, alignment=TA_CENTER)),
                Paragraph("New Service Pages", ParagraphStyle("l", fontName="Helvetica",
               fontSize=9, textColor=MID_GRAY, alignment=TA_CENTER))]],
              colWidths=[W/3 - 8]),
        Table([[Paragraph("7", ParagraphStyle("n", fontName="Helvetica-Bold",
               fontSize=36, textColor=BRAND_GREEN, alignment=TA_CENTER)),
                Paragraph("URLs in Sitemap", ParagraphStyle("l", fontName="Helvetica",
               fontSize=9, textColor=MID_GRAY, alignment=TA_CENTER))]],
              colWidths=[W/3 - 8]),
        Table([[Paragraph("13", ParagraphStyle("n", fontName="Helvetica-Bold",
               fontSize=36, textColor=BRAND_GREEN, alignment=TA_CENTER)),
                Paragraph("Cities in Schema", ParagraphStyle("l", fontName="Helvetica",
               fontSize=9, textColor=MID_GRAY, alignment=TA_CENTER))]],
              colWidths=[W/3 - 8]),
    ]
]
stat_table = Table(stat_data, colWidths=[W/3, W/3, W/3])
stat_table.setStyle(TableStyle([
    ("ALIGN", (0,0), (-1,-1), "CENTER"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("BACKGROUND", (0,0), (0,0), LIGHT_GRAY),
    ("BACKGROUND", (1,0), (1,0), colors.HexColor("#E8F5E9")),
    ("BACKGROUND", (2,0), (2,0), LIGHT_GRAY),
    ("ROUNDEDCORNERS", [8]),
    ("TOPPADDING",   (0,0), (-1,-1), 14),
    ("BOTTOMPADDING",(0,0), (-1,-1), 14),
    ("LEFTPADDING",  (0,0), (-1,-1), 8),
    ("RIGHTPADDING", (0,0), (-1,-1), 8),
]))
story.append(stat_table)
story.append(sp(16))

# What was done summary table
story += section_header("At a Glance", "What Was Built & Updated")

changes = [
    ["New Service Page", "Carpet & Upholstery Cleaning", "/services/carpet-upholstery-cleaning"],
    ["New Service Page", "LVT, Tile & Hard Surfaces", "/services/lvt-tile-hard-surfaces"],
    ["New Service Page", "Commercial Carpet & Hard Floor Programs", "/services/commercial-programs"],
    ["New File", "sitemap.xml (7 pages)", "/sitemap.xml"],
    ["New File", "llms.txt (AI crawler index)", "/llms.txt"],
    ["Updated", "robots.txt", "/robots.txt"],
    ["Updated", "index.html — title, description, Open Graph, JSON-LD schema", "/"],
    ["Updated", "Navbar — Services dropdown with all 3 service pages", "All pages"],
    ["Updated", "Per-page canonical URLs (prevents duplicate content signals)", "Each service page"],
]

ch_data = [[
    Paragraph("Type", styles["table_head"]),
    Paragraph("What", styles["table_head"]),
    Paragraph("Location", styles["table_head"]),
]] + [[
    Paragraph(r[0], styles["table_cell_bold"]),
    Paragraph(r[1], styles["table_cell"]),
    Paragraph(r[2], styles["table_cell_gray"]),
] for r in changes]

ch_table = Table(ch_data, colWidths=[1.3*inch, 3.5*inch, W - 4.8*inch])
ch_table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), BRAND_GREEN),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT_GRAY]),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("TOPPADDING",   (0,0), (-1,-1), 7),
    ("BOTTOMPADDING",(0,0), (-1,-1), 7),
    ("LEFTPADDING",  (0,0), (-1,-1), 8),
    ("RIGHTPADDING", (0,0), (-1,-1), 8),
    ("GRID", (0,0), (-1,-1), 0.3, BORDER_GRAY),
    ("LINEBELOW", (0,0), (-1,0), 1.5, BRAND_GREEN),
]))
story.append(ch_table)

story.append(PageBreak())


# ════════════════════════════════════════════════════════════
#  PAGE 3 — INDIVIDUAL SERVICE PAGES
# ════════════════════════════════════════════════════════════

story += section_header("Section 1", "Individual Service Pages")

story.append(Paragraph(
    "The single most impactful SEO change made to this website. Each service now lives at its own URL, "
    "with its own title, description, content, images, and FAQ section.",
    styles["intro"]
))

story.append(green_callout(
    "<b>Why this matters:</b> Google ranks individual URLs, not websites. When someone searches "
    "\"carpet cleaning West Bend WI\" or \"tile floor cleaning Washington County,\" Google needs a page "
    "that is specifically about that topic to rank for it. A single page covering all services means "
    "Google has to pick one topic to associate with that URL — and usually picks none clearly, "
    "which pushes you down for all of them."
))
story.append(sp(12))

services = [
    {
        "url": "kmpc.netlify.app/services/carpet-upholstery-cleaning",
        "title": "Carpet & Upholstery Cleaning",
        "target": "Homeowners, property managers, pet owners, allergy sufferers",
        "keywords": "carpet cleaning West Bend WI, upholstery cleaning Washington County, hot water extraction, IICRC certified",
        "sections": "Hero, overview, 6-service card grid, 8-step process, second image, 5-question FAQ, CTA, internal links",
        "meta": "Professional carpet and upholstery cleaning in Washington County, WI. IICRC-certified, hot water extraction, 3M Scotchgard. Since 1987. (262) 334-1881.",
    },
    {
        "url": "kmpc.netlify.app/services/lvt-tile-hard-surfaces",
        "title": "LVT, Tile & Hard Surfaces",
        "target": "Homeowners with hard floors, builders, remodelers",
        "keywords": "tile cleaning West Bend, LVT cleaning Wisconsin, grout cleaning, natural stone cleaning, hardwood floor cleaning",
        "sections": "Hero, overview, 6-service card grid, why professional matters (4 points), second image, 5-question FAQ, CTA, internal links",
        "meta": "Professional LVT, tile, grout, hardwood, and natural stone floor cleaning in Washington County, WI. Manufacturer-safe. IICRC-certified. Since 1987.",
    },
    {
        "url": "kmpc.netlify.app/services/commercial-programs",
        "title": "Commercial Carpet & Hard Floor Programs",
        "target": "Property managers, facility directors, office managers, contractors",
        "keywords": "commercial carpet cleaning West Bend WI, commercial floor care southeastern Wisconsin, facility maintenance cleaning",
        "sections": "Hero, overview, 6-service card grid, why clients choose us (4 points), industries served list, 5-question FAQ, CTA, internal links",
        "meta": "Commercial carpet and hard floor cleaning programs in West Bend, WI and southeastern Wisconsin. Restorative & maintenance. IICRC-certified. (262) 334-1881.",
    },
]

for svc in services:
    story.append(KeepTogether([
        sp(4),
        Table([[
            Paragraph(svc["title"], ParagraphStyle("sh",
                fontName="Helvetica-Bold", fontSize=12, textColor=BRAND_GREEN)),
            Paragraph(svc["url"], ParagraphStyle("url",
                fontName="Helvetica-Oblique", fontSize=8, textColor=MID_GRAY,
                alignment=TA_RIGHT)),
        ]], colWidths=[3*inch, W - 3*inch], style=[
            ("VALIGN", (0,0), (-1,-1), "BOTTOM"),
            ("TOPPADDING", (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 0),
            ("LEFTPADDING", (0,0), (-1,-1), 0),
            ("RIGHTPADDING", (0,0), (-1,-1), 0),
        ]),
        HRFlowable(width="100%", thickness=0.5, color=BORDER_GRAY,
                   spaceBefore=4, spaceAfter=8),
        two_col_table([
            ["Target audience:", svc["target"]],
            ["Primary keywords:", svc["keywords"]],
            ["Page sections:", svc["sections"]],
            ["Meta description:", svc["meta"]],
        ]),
        sp(12),
    ]))

story.append(PageBreak())


# ════════════════════════════════════════════════════════════
#  PAGE 4 — SITEMAP & LLMS.TXT
# ════════════════════════════════════════════════════════════

story += section_header("Section 2", "sitemap.xml — Telling Google What to Index")

story.append(Paragraph(
    "A sitemap is a file that lists every page on your website so search engines can find and "
    "crawl them efficiently. Without a sitemap, Google has to discover your pages by following "
    "links — a slower and less reliable process.",
    styles["body"]
))
story.append(sp(8))
story.append(green_callout(
    "<b>Why this matters:</b> New pages — especially pages deep in your URL structure like "
    "/services/carpet-upholstery-cleaning — can take weeks or months for Google to discover on "
    "their own. Submitting a sitemap to Google Search Console tells Google exactly what exists "
    "and invites immediate crawling."
))
story.append(sp(12))

sitemap_data = [
    [Paragraph("URL", styles["table_head"]),
     Paragraph("Priority", styles["table_head"]),
     Paragraph("Change Freq", styles["table_head"]),
     Paragraph("Reason", styles["table_head"])],
    [Paragraph("/", styles["table_cell_bold"]),
     Paragraph("1.00", styles["table_cell"]),
     Paragraph("Monthly", styles["table_cell"]),
     Paragraph("Homepage — highest priority", styles["table_cell"])],
    [Paragraph("/services/carpet-upholstery-cleaning", styles["table_cell_bold"]),
     Paragraph("0.90", styles["table_cell"]),
     Paragraph("Monthly", styles["table_cell"]),
     Paragraph("Key service page", styles["table_cell"])],
    [Paragraph("/services/lvt-tile-hard-surfaces", styles["table_cell_bold"]),
     Paragraph("0.90", styles["table_cell"]),
     Paragraph("Monthly", styles["table_cell"]),
     Paragraph("Key service page", styles["table_cell"])],
    [Paragraph("/services/commercial-programs", styles["table_cell_bold"]),
     Paragraph("0.90", styles["table_cell"]),
     Paragraph("Monthly", styles["table_cell"]),
     Paragraph("Key service page", styles["table_cell"])],
    [Paragraph("/contact", styles["table_cell_bold"]),
     Paragraph("0.80", styles["table_cell"]),
     Paragraph("Yearly", styles["table_cell"]),
     Paragraph("Conversion page", styles["table_cell"])],
    [Paragraph("/about", styles["table_cell_bold"]),
     Paragraph("0.70", styles["table_cell"]),
     Paragraph("Yearly", styles["table_cell"]),
     Paragraph("Trust-building page", styles["table_cell"])],
    [Paragraph("/before-after", styles["table_cell_bold"]),
     Paragraph("0.65", styles["table_cell"]),
     Paragraph("Monthly", styles["table_cell"]),
     Paragraph("Social proof / gallery", styles["table_cell"])],
]

sm_col_w = [2.6*inch, 0.7*inch, 0.9*inch, W - 4.2*inch]
sm_table = Table(sitemap_data, colWidths=sm_col_w)
sm_table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), BRAND_GREEN),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT_GRAY]),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("TOPPADDING",   (0,0), (-1,-1), 6),
    ("BOTTOMPADDING",(0,0), (-1,-1), 6),
    ("LEFTPADDING",  (0,0), (-1,-1), 8),
    ("RIGHTPADDING", (0,0), (-1,-1), 8),
    ("GRID", (0,0), (-1,-1), 0.3, BORDER_GRAY),
]))
story.append(sm_table)
story.append(sp(6))
story.append(Paragraph(
    "Action required: Submit https://kmpc.netlify.app/sitemap.xml in Google Search Console "
    "under Sitemaps, then use the URL Inspection tool on each service page and click "
    "\"Request Indexing\" to accelerate crawling.",
    styles["caption"]
))

story.append(sp(16))

# ── llms.txt ─────────────────────────────────────────────
story += section_header("Section 3", "llms.txt — Visibility With AI Search Tools")

story.append(Paragraph(
    "llms.txt is a new, emerging standard (similar to robots.txt) that helps AI-powered search "
    "tools — like ChatGPT, Perplexity, Google's AI Overviews, and Claude — understand your "
    "business and reference it accurately when users ask questions.",
    styles["body"]
))
story.append(sp(8))
story.append(callout(
    "<b>Why this matters:</b> A growing percentage of people now use AI assistants to find local "
    "services. When someone asks ChatGPT \"who does carpet cleaning near West Bend WI,\" the AI "
    "reads publicly available web content to generate its answer. Your llms.txt file is structured "
    "specifically for AI consumption — business name, services, phone, address, service area, and "
    "certifications — making it more likely to be included in AI-generated answers."
))
story.append(sp(10))

story.append(Paragraph("What your llms.txt includes:", styles["body_bold"]))
llms_items = [
    "Business name, founding year (1987), and location (West Bend, WI)",
    "All 3 services with descriptions and direct URLs",
    "Phone number, email address, and physical mailing address",
    "IICRC and CRI certification details",
    "Full service area: Washington County, Ozaukee County, greater Milwaukee",
    "Named cities: West Bend, Menomonee Falls, Germantown, Slinger, Hartford, Cedarburg",
]
for item in llms_items:
    story.append(Paragraph(f"• {item}", styles["bullet"]))

story.append(sp(10))

# robots.txt
story += section_header("Section 4", "robots.txt — Crawler Permissions")
story.append(Paragraph(
    "robots.txt tells search engine crawlers which pages they are allowed to access. "
    "Your file was updated to explicitly permit both traditional search crawlers and "
    "AI crawlers, and the sitemap reference was moved to the spec-compliant position "
    "at the bottom of the file.",
    styles["body"]
))
story.append(sp(8))
crawlers = [
    ["Googlebot", "Google Search — the most important crawler for organic rankings"],
    ["GPTBot", "OpenAI / ChatGPT — reads your site for AI-generated answers"],
    ["Claude-Web / anthropic-ai", "Anthropic / Claude — AI assistant web search"],
    ["PerplexityBot", "Perplexity AI — AI-native search engine used by millions"],
]
cr_data = [[
    Paragraph("Crawler", styles["table_head"]),
    Paragraph("Used By", styles["table_head"]),
]] + [[
    Paragraph(r[0], styles["table_cell_bold"]),
    Paragraph(r[1], styles["table_cell"]),
] for r in crawlers]
cr_table = Table(cr_data, colWidths=[2.2*inch, W - 2.2*inch])
cr_table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), BRAND_GREEN),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT_GRAY]),
    ("TOPPADDING",   (0,0), (-1,-1), 6),
    ("BOTTOMPADDING",(0,0), (-1,-1), 6),
    ("LEFTPADDING",  (0,0), (-1,-1), 8),
    ("RIGHTPADDING", (0,0), (-1,-1), 8),
    ("GRID", (0,0), (-1,-1), 0.3, BORDER_GRAY),
]))
story.append(cr_table)

story.append(PageBreak())


# ════════════════════════════════════════════════════════════
#  PAGE 5 — METADATA & SCHEMA
# ════════════════════════════════════════════════════════════

story += section_header("Section 5", "Page Titles & Meta Descriptions")

story.append(Paragraph(
    "Every page now has a unique, keyword-optimized title and meta description. These are the "
    "two most visible elements of a Google search result — the blue link and the gray text beneath it.",
    styles["body"]
))
story.append(sp(8))
story.append(green_callout(
    "<b>Why titles matter:</b> Google uses the page title as the primary signal for what a page "
    "is about. Including the service name, city, and state in every title directly tells Google "
    "which search queries that page should appear for. Pages with vague titles like "
    "\"Services\" rank for nothing specific."
))
story.append(sp(10))

meta_data = [
    [Paragraph("Page", styles["table_head"]),
     Paragraph("Title Tag", styles["table_head"]),
     Paragraph("Meta Description", styles["table_head"])],
    [Paragraph("Home", styles["table_cell_bold"]),
     Paragraph("Kettle Moraine Professional Cleaners | West Bend, WI", styles["table_cell"]),
     Paragraph("Expert carpet, upholstery, LVT, tile, and hard surface floor cleaning in Washington County, WI. IICRC-certified, family-owned since 1987. Call (262) 334-1881.", styles["table_cell"])],
    [Paragraph("Carpet &\nUpholstery", styles["table_cell_bold"]),
     Paragraph("Carpet & Upholstery Cleaning in West Bend, WI | Kettle Moraine Professional Cleaners", styles["table_cell"]),
     Paragraph("Professional carpet and upholstery cleaning in Washington County, WI. IICRC-certified, hot water extraction, 3M Scotchgard, 8-step process. Since 1987. (262) 334-1881.", styles["table_cell"])],
    [Paragraph("LVT, Tile &\nHard Surfaces", styles["table_cell_bold"]),
     Paragraph("LVT, Tile & Hard Surface Floor Cleaning in West Bend, WI | Kettle Moraine Professional Cleaners", styles["table_cell"]),
     Paragraph("Professional LVT, tile, grout, hardwood, and natural stone floor cleaning in Washington County, WI. Manufacturer-safe. IICRC-certified. Since 1987. (262) 334-1881.", styles["table_cell"])],
    [Paragraph("Commercial\nPrograms", styles["table_cell_bold"]),
     Paragraph("Commercial Carpet & Hard Floor Programs in West Bend, WI | Kettle Moraine Professional Cleaners", styles["table_cell"]),
     Paragraph("Commercial carpet and hard floor cleaning programs in West Bend, WI and southeastern Wisconsin. Restorative & maintenance cleaning. IICRC-certified. (262) 334-1881.", styles["table_cell"])],
]
m_col_w = [0.95*inch, 2.3*inch, W - 3.25*inch]
meta_table = Table(meta_data, colWidths=m_col_w)
meta_table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), BRAND_GREEN),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT_GRAY]),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("TOPPADDING",   (0,0), (-1,-1), 7),
    ("BOTTOMPADDING",(0,0), (-1,-1), 7),
    ("LEFTPADDING",  (0,0), (-1,-1), 7),
    ("RIGHTPADDING", (0,0), (-1,-1), 7),
    ("GRID", (0,0), (-1,-1), 0.3, BORDER_GRAY),
]))
story.append(meta_table)
story.append(sp(8))
story.append(Paragraph(
    "Each service page also updates its canonical URL tag on load, which tells Google the definitive "
    "address for that page and prevents duplicate content penalties across the site.",
    styles["caption"]
))

story.append(sp(16))

# ── Schema / JSON-LD ──────────────────────────────────────
story += section_header("Section 6", "Structured Data (JSON-LD Schema)")

story.append(Paragraph(
    "Structured data is code embedded in your website that tells Google exactly what kind of "
    "business you are, where you're located, what you offer, and who you serve — in a format "
    "that machines can read perfectly.",
    styles["body"]
))
story.append(sp(8))
story.append(callout(
    "<b>Why this matters:</b> Structured data is what enables Google's rich results — the "
    "star ratings, phone numbers, addresses, and business hours that appear directly in search "
    "results before a user even clicks. It also powers Google's local Knowledge Panel "
    "(the business card on the right side of search results) and helps Google associate your "
    "business with the right geographic area and service category."
))
story.append(sp(10))

schema_fields = [
    ["@type", 'LocalBusiness + CleaningService (dual type — more specific than generic LocalBusiness, '
              'matches Google\'s category for cleaning companies)'],
    ["name", "Kettle Moraine Professional Cleaners"],
    ["address", "2334 Stonebridge Cir Unit E, West Bend, WI 53095"],
    ["telephone", "(262) 334-1881"],
    ["email", "kettlemoraineprocleaners@gmail.com"],
    ["geo", "Lat/Lng coordinates (43.4283, -88.1834) — pinpoints your location for Google Maps"],
    ["foundingDate", "1987 — signals to Google that this is an established, trusted business"],
    ["areaServed", "13 entries: West Bend, Menomonee Falls, Germantown, Slinger, Hartford, "
                   "Cedarburg, Grafton, Mequon, Port Washington, Pewaukee + Washington, "
                   "Ozaukee, and Waukesha Counties"],
    ["hasOfferCatalog", "All 3 services listed with name, description, and URL"],
    ["sameAs", "Facebook business page URL"],
    ["image", "Business logo URL"],
]
story.append(two_col_table(schema_fields, col1_w=1.5*inch))

story.append(PageBreak())


# ════════════════════════════════════════════════════════════
#  PAGE 6 — OPEN GRAPH & INTERNAL LINKING
# ════════════════════════════════════════════════════════════

story += section_header("Section 7", "Open Graph Tags — Social Sharing")

story.append(Paragraph(
    "Open Graph tags control how your website appears when someone shares a link on "
    "Facebook, texts it to a friend, or posts it to a messaging app. Without these tags, "
    "social platforms often display broken previews or the wrong information.",
    styles["body"]
))
story.append(sp(8))

og_tags = [
    ["og:title", "Kettle Moraine Professional Cleaners | West Bend, WI"],
    ["og:description", "Professional carpet, upholstery, and floor cleaning in Washington County, WI. IICRC-certified, family-owned since 1987."],
    ["og:type", "website"],
    ["og:url", "https://kmpc.netlify.app/"],
    ["og:image", "Business logo (recommend replacing with a 1200×630px photo of your work or van for best results)"],
    ["og:locale", "en_US"],
]
story.append(two_col_table(og_tags, col1_w=1.3*inch))
story.append(sp(8))
story.append(green_callout(
    "<b>Recommendation:</b> For the best social share card (the preview image when someone shares "
    "your link), provide a high-quality 1200×630 pixel photo — your van, a before/after shot, "
    "or your team. This can be swapped in at any time without changing the rest of your code."
))

story.append(sp(16))

# ── Internal Linking ──────────────────────────────────────
story += section_header("Section 8", "Internal Linking & Navigation Structure")

story.append(Paragraph(
    "Internal links are links from one page on your site to another. They serve two purposes: "
    "they help users navigate, and they distribute SEO authority across your pages so no single "
    "page has to carry all the weight.",
    styles["body"]
))
story.append(sp(8))
story.append(callout(
    "<b>Why this matters:</b> Google uses internal links to discover pages and to understand which "
    "pages are the most important. Every service page linking to the other two service pages "
    "tells Google all three are important — and users who land on one page can easily find the others."
))
story.append(sp(10))

story.append(Paragraph("What was added:", styles["body_bold"]))
link_items = [
    'Navbar "Services" dropdown — visible on every page, linking to all 3 service pages',
    "Each service page includes an \"Also see:\" strip at the bottom with links to both other service pages",
    "\"Also see:\" strips also link to Before & After and About pages",
    "Every page links to the Contact page via the booking button in the CTA section",
    "Footer links are present site-wide (address, phone, email)",
]
for item in link_items:
    story.append(Paragraph(f"• {item}", styles["bullet"]))

story.append(sp(16))

# ── Full Checklist ────────────────────────────────────────
story += section_header("Section 9", "Complete SEO Checklist")

checks = [
    (True,  "sitemap.xml", "All 7 pages listed with correct priorities and today's date"),
    (True,  "llms.txt", "AI crawler index with services, contact info, and service area"),
    (True,  "robots.txt", "All crawlers permitted; Sitemap reference at spec-compliant position"),
    (True,  "Service page: Carpet & Upholstery", "Unique URL, title, description, canonical, FAQ, CTA"),
    (True,  "Service page: LVT, Tile & Hard Surfaces", "Unique URL, title, description, canonical, FAQ, CTA"),
    (True,  "Service page: Commercial Programs", "Unique URL, title, description, canonical, FAQ, CTA"),
    (True,  "Canonical URLs", "Each service page sets its own canonical on load; resets on exit"),
    (True,  "JSON-LD Schema", "CleaningService type, full address, geo coords, 13-city areaServed, offer catalog"),
    (True,  "Open Graph tags", "og:title, og:description, og:image, og:url, og:locale"),
    (True,  "Per-page meta descriptions", "Unique, keyword-rich description on every page"),
    (True,  "Per-page title tags", "Service + City + State + Business name on every service page"),
    (True,  "Internal linking", "All service pages cross-link; navbar dropdown covers all pages"),
    (True,  "Navbar Services dropdown", "Desktop hover dropdown + mobile accordion, both functional"),
    (False, "Google Search Console submission", "ACTION REQUIRED — submit sitemap and request indexing"),
    (False, "og:image photo", "RECOMMENDED — swap favicon for a 1200x630px photo of your work"),
    (False, "Google Business Profile sync", "RECOMMENDED — verify schema data matches your GBP listing"),
]

icon_col = 0.22 * inch
label_col = 2.2 * inch
note_col = W - icon_col - label_col

cl_data = [[
    Paragraph("", styles["table_head"]),
    Paragraph("Item", styles["table_head"]),
    Paragraph("Detail", styles["table_head"]),
]] + [
    [
        Paragraph("✓" if c[0] else "→",
                  styles["check_yes"] if c[0] else styles["tag_yellow"]),
        Paragraph(c[1], styles["table_cell_bold"] if c[0] else
                  ParagraphStyle("p", fontName="Helvetica-Bold", fontSize=9,
                                 textColor=colors.HexColor("#7A5900"), leading=13)),
        Paragraph(c[2], styles["table_cell"]),
    ]
    for c in checks
]

cl_table = Table(cl_data, colWidths=[icon_col, label_col, note_col])
cl_table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), BRAND_GREEN),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT_GRAY]),
    ("ROWBACKGROUNDS", (0,len(checks)-1), (-1,-1), [YELLOW_LIGHT, YELLOW_LIGHT]),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("ALIGN", (0,0), (0,-1), "CENTER"),
    ("TOPPADDING",   (0,0), (-1,-1), 6),
    ("BOTTOMPADDING",(0,0), (-1,-1), 6),
    ("LEFTPADDING",  (0,0), (-1,-1), 6),
    ("RIGHTPADDING", (0,0), (-1,-1), 6),
    ("GRID", (0,0), (-1,-1), 0.3, BORDER_GRAY),
    ("LINEABOVE", (0, len(checks)-1), (-1, len(checks)-1), 1, YELLOW),
]))
story.append(cl_table)

story.append(PageBreak())


# ════════════════════════════════════════════════════════════
#  PAGE 7 — NEXT STEPS
# ════════════════════════════════════════════════════════════

story += section_header("Next Steps", "What To Do Now")

story.append(Paragraph(
    "The technical SEO groundwork is complete. The following actions will activate and "
    "accelerate the results.",
    styles["intro"]
))

steps = [
    {
        "num": "01",
        "title": "Submit Your Sitemap to Google Search Console",
        "priority": "CRITICAL",
        "body": (
            "Go to search.google.com/search-console and sign in. Under your property, "
            "click Sitemaps in the left menu. Enter the full sitemap URL:\n"
            "https://kmpc.netlify.app/sitemap.xml\n"
            "and click Submit. Then use the URL Inspection tool on each of the 3 new service "
            "page URLs and click \"Request Indexing\" on each one. This is the single most "
            "important action to take today."
        ),
    },
    {
        "num": "02",
        "title": "Verify Your Google Business Profile Matches Your Schema",
        "priority": "HIGH",
        "body": (
            "Your website's structured data lists your address, phone, and services. "
            "Your Google Business Profile (GBP) should show the same information. "
            "Log in to your GBP, confirm the address (2334 Stonebridge Cir Unit E, West Bend, WI 53095), "
            "phone ((262) 334-1881), and that your service categories include Carpet Cleaning and "
            "Floor Cleaning. Consistency between schema and GBP strengthens your local ranking signal."
        ),
    },
    {
        "num": "03",
        "title": "Add a Proper Social Share Image",
        "priority": "RECOMMENDED",
        "body": (
            "The og:image is currently set to your favicon (a small logo). For the best appearance "
            "when your website is shared on Facebook, texted, or posted anywhere, provide a "
            "1200×630 pixel photo — your service van, a before/after result, or your team in "
            "action. This can be swapped in without any other changes."
        ),
    },
    {
        "num": "04",
        "title": "Monitor Google Search Console for Coverage Reports",
        "priority": "ONGOING",
        "body": (
            "After submitting your sitemap, check Google Search Console weekly for the first month. "
            "The Coverage report will show when each page has been indexed. The Performance report "
            "will start showing which search queries are bringing people to each service page. "
            "This data is the best early signal of how the SEO work is performing."
        ),
    },
    {
        "num": "05",
        "title": "Build Citations and Backlinks",
        "priority": "ONGOING",
        "body": (
            "Local SEO rankings depend on two main factors: on-page optimization (done) and "
            "off-page authority (links from other websites). The next growth lever is getting "
            "your business listed consistently on Yelp, Angi, HomeAdvisor, the Better Business "
            "Bureau, and local Wisconsin business directories. Each listing with your name, "
            "address, and phone number (NAP) reinforces your local presence to Google."
        ),
    },
]

priority_colors = {
    "CRITICAL": colors.HexColor("#C62828"),
    "HIGH": colors.HexColor("#E65100"),
    "RECOMMENDED": BRAND_GREEN,
    "ONGOING": MID_GRAY,
}

for step in steps:
    pc = priority_colors[step["priority"]]
    story.append(KeepTogether([
        sp(6),
        Table([[
            Table([[
                Paragraph(step["num"], ParagraphStyle("sn",
                    fontName="Helvetica-Bold", fontSize=18, textColor=BRAND_GREEN,
                    alignment=TA_CENTER)),
            ]], colWidths=[0.55*inch], style=[
                ("BACKGROUND", (0,0), (-1,-1), LIGHT_GRAY),
                ("TOPPADDING", (0,0), (-1,-1), 6),
                ("BOTTOMPADDING", (0,0), (-1,-1), 6),
                ("LEFTPADDING", (0,0), (-1,-1), 0),
                ("RIGHTPADDING", (0,0), (-1,-1), 0),
                ("BOX", (0,0), (-1,-1), 1, BORDER_GRAY),
            ]),
            Table([[
                Paragraph(step["title"], ParagraphStyle("st",
                    fontName="Helvetica-Bold", fontSize=11, textColor=BLACK)),
                Paragraph(step["priority"], ParagraphStyle("sp",
                    fontName="Helvetica-Bold", fontSize=7.5, textColor=pc,
                    alignment=TA_RIGHT, letterSpacing=0.5)),
            ]], colWidths=[3.5*inch, W - 4.25*inch], style=[
                ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
                ("TOPPADDING", (0,0), (-1,-1), 0),
                ("BOTTOMPADDING", (0,0), (-1,-1), 0),
                ("LEFTPADDING", (0,0), (-1,-1), 0),
                ("RIGHTPADDING", (0,0), (-1,-1), 0),
            ]),
        ]], colWidths=[0.6*inch, W - 0.6*inch], style=[
            ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
            ("LEFTPADDING", (0,0), (-1,-1), 0),
            ("RIGHTPADDING", (0,0), (-1,-1), 0),
            ("TOPPADDING", (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 0),
        ]),
        sp(6),
        Paragraph(step["body"].replace("\n", "<br/>"), styles["body"]),
        HRFlowable(width="100%", thickness=0.4, color=BORDER_GRAY,
                   spaceBefore=10, spaceAfter=4),
    ]))

story.append(sp(16))

# ── Closing ───────────────────────────────────────────────
story.append(KeepTogether([
    rule(BRAND_GREEN, thickness=1.5, space_before=8, space_after=12),
    Table([[
        Paragraph(
            "Questions about this report or the work described? Contact Zach Howell.",
            ParagraphStyle("cl", fontName="Helvetica", fontSize=9, textColor=MID_GRAY,
                           leading=14)
        ),
        Paragraph(
            "zhowellportfolio.netlify.app",
            ParagraphStyle("cl2", fontName="Helvetica-Bold", fontSize=9,
                           textColor=BRAND_GREEN, alignment=TA_RIGHT, leading=14)
        ),
    ]], colWidths=[4*inch, W - 4*inch], style=[
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 0),
        ("BOTTOMPADDING", (0,0), (-1,-1), 0),
        ("LEFTPADDING", (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
    ]),
]))


# ── Build ──────────────────────────────────────────────────
doc.build(
    story,
    onFirstPage=on_cover,
    onLaterPages=on_page,
)

print(f"PDF saved to: {OUTPUT}")
