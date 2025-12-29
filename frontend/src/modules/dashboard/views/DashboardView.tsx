
import {
    PackagePlus,
    PackageCheck,
    Archive,
    TriangleAlert
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'

export function DashboardView() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">

            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Visão Geral</h2>
                    <p className="text-muted-foreground mt-1">Resumo da operação de recebimento hoje.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Hoje</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">Últimos 7 dias</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Entradas Hoje" value="24" trend="+12% vs ontem" icon={<PackagePlus className="text-primary" />} />
                <StatsCard title="Em Conferência" value="8" trend="3 aguardando" icon={<Archive className="text-orange-400" />} />
                <StatsCard title="Quarentena" value="3" trend="1 crítico" icon={<TriangleAlert className="text-destructive" />} />
                <StatsCard title="Concluídos" value="145" trend="Esta semana" icon={<PackageCheck className="text-emerald-500" />} />
            </div>

            {/* Recent Activity */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Entradas Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <PackagePlus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-foreground">Nota Fiscal #{4500 + i}</p>
                                        <p className="text-xs text-muted-foreground">Johnson & Johnson MedTech</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-muted-foreground">Há {i * 15} min</span>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                        Aguardando
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StatsCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-default">
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    {icon}
                </div>
                <div className="flex flex-col mt-2">
                    <div className="text-2xl font-bold text-foreground">{value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{trend}</p>
                </div>
            </CardContent>
        </Card>
    )
}
