
import { Card } from "@/components/ui/card";

const SubscriptionPlans = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex flex-col items-center">
          <h3 className="font-bold mb-2">Free</h3>
          <p className="text-2xl font-bold mb-2">$0</p>
          <p className="text-sm text-center text-gray-600">Basic assessment features</p>
        </div>
      </Card>
      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-primary">
        <div className="flex flex-col items-center">
          <h3 className="font-bold mb-2">Premium</h3>
          <p className="text-2xl font-bold mb-2">$49</p>
          <p className="text-sm text-center text-gray-600">Full assessment and AI coaching</p>
        </div>
      </Card>
      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex flex-col items-center">
          <h3 className="font-bold mb-2">Enterprise</h3>
          <p className="text-2xl font-bold mb-2">$99</p>
          <p className="text-sm text-center text-gray-600">Custom solutions and support</p>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
