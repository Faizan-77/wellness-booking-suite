import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/hooks/use-toast";

interface Appointment {
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  notes: string;
}

export default function AppointmentBooking() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!doctorId) {
      toast({
        title: "Error",
        description: "Doctor ID is missing.",
        variant: "destructive",
      });
      navigate('/doctors');
    }
  }, [doctorId, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedDate = selectedDate.toISOString(); // Convert Date to ISO string
      const appointment = {
        doctorId,
        patientId: user?.id,
        date: formattedDate,
        time: selectedTime,
        notes: notes,
      };

      // Here you would typically send the appointment data to your backend
      console.log('Appointment data:', appointment);
      toast({
        title: "Success",
        description: "Appointment booked successfully!",
      });
      navigate('/patient-dashboard');
    } catch (error) {
      console.error("Appointment booking error:", error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Book Appointment</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center" side="bottom">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                placeholder="Any additional notes for the doctor?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
