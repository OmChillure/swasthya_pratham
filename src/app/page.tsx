import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import Image from "next/image"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full md:pt-100 lg:pt-10 xl:pt-20 mb-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock the Power of Data with Our Full-Stack Solution
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Leverage our cutting-edge platform to store, analyze, and gain insights from your data. Powered by
                    Rust for lightning-fast performance.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <Image src={"/report.png"} height={450} width={450} alt="bgimage"></Image>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Flexible Pricing for Every Need</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose from our range of subscription plans to find the perfect fit for your business. Enjoy powerful
                  data storage and AI-powered insights, all backed by our Rust-powered infrastructure.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="rounded-2xl p-6 shadow-lg">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Get started with our basic plan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold">$9</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="grid gap-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        5GB data storage
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        Basic data analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        Email support
                      </li>
                    </ul>
                    <Button className="mt-4">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl p-6 shadow-lg">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>Unlock advanced features for your business.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold">$29</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="grid gap-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        50GB data storage
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        Advanced data analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        AI-powered insights
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        Priority support
                      </li>
                    </ul>
                    <Button className="mt-4">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl p-6 shadow-lg">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Tailored solutions for large-scale businesses.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold">$99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="grid gap-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        Unlimited data storage
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        Advanced AI-powered analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        Dedicated account manager
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" />
                        Custom integrations
                      </li>
                    </ul>
                    <Button className="mt-4">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock the Power of Your Data</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our full-stack solution provides powerful data storage, advanced analytics, and AI-driven insights to
                  help you make informed decisions. Backed by our lightning-fast Rust infrastructure.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="rounded-2xl p-6 shadow-lg">
                <CardHeader>
                  <CardTitle>Secure Data Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                      Store your data securely in our Rust-powered infrastructure, with options for unlimited storage
                      and advanced access controls.
                    </p>
                    <Button variant="link">Learn more</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl p-6 shadow-lg">
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                      Unlock powerful data analysis tools to uncover insights and trends, with AI-powered
                      recommendations to help you make informed decisions.
                    </p>
                    <Button variant="link">Learn more</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl p-6 shadow-lg">
                <CardHeader>
                  <CardTitle>Rust-Powered Backend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                      Our Rust-based backend infrastructure ensures lightning-fast performance, unparalleled security,
                      and scalability to meet your growing needs.
                    </p>
                    <Button variant="link">Learn more</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Unlock the Power of Your Data?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and start leveraging our full-stack solution to store, analyze, and gain insights from
                your data.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get Started
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}