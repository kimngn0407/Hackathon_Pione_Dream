"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, FileSpreadsheet, TrendingUp, Users } from "lucide-react";

interface QuickActionsProps {
  onActionClick: (query: string) => void;
  disabled?: boolean;
}

export function QuickActions({ onActionClick, disabled }: QuickActionsProps) {
  const actions = [
    {
      icon: BarChart3,
      label: "Kiểm tra đất",
      query: "Phân tích chỉ số đất (pH, dinh dưỡng) và gợi ý biện pháp cải tạo",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: TrendingUp,
      label: "Tưới thông minh",
      query: "Gợi ý lịch tưới tối ưu dựa trên giai đoạn sinh trưởng và thời tiết",
      color: "from-lime-500 to-amber-400"
    },
    {
      icon: Users,
      label: "Phân bón gợi ý",
      query: "Đề xuất lịch bón phân cân đối theo giai đoạn sinh trưởng cho cây trồng",
      color: "from-yellow-400 to-amber-500"
    },
    {
      icon: FileSpreadsheet,
      label: "Insights Excel",
      query: "Đưa ra những insights thú vị từ dữ liệu Excel này (câu hỏi-đáp về nông nghiệp)",
      color: "from-amber-400 to-amber-500"
    }
  ];

  return (
    <div className="space-y-4">
  <h3 className="text-sm font-semibold text-emerald-800 px-1">Câu hỏi gợi ý</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
              <Button
                variant="ghost"
                className="relative h-auto p-4 justify-start text-left bg-white/60 hover:bg-white/80 border border-white/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed w-full rounded-xl backdrop-blur-sm"
                onClick={() => onActionClick(action.query)}
                disabled={disabled}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-r ${action.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm">{action.label}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {action.query}
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}