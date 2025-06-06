"use client";
import { useState } from "react";
import {
  Search,
  Mail,
  User,
  Calendar,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/lib/queries";
import { cn } from "@/lib/utils";

export default function UserSearchPage() {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { users, isUsersLoading, usersError } = useUsers();
  console.log(users, isUsersLoading, usersError);

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      setError("Please enter an email address to search");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults(null);
    setHasSearched(true);

    try {
      if (usersError) throw usersError;
      const results = users.filter((user) =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const resetSearch = () => {
    setSearchEmail("");
    setSearchResults(null);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">User Search</h1>
          <p className="text-gray-600">
            Search for users by their email address
          </p>
        </div>

        {/* Search Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Users
            </CardTitle>
            <CardDescription>
              Enter an email address to find matching users in the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="Enter email address..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || isUsersLoading}
                className="px-6"
              >
                {isLoading || isUsersLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>

            {hasSearched && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {searchResults &&
                    `Found ${searchResults.length} user(s) matching "${searchEmail}"`}
                </p>
                <Button variant="outline" size="sm" onClick={resetSearch}>
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500">
            An error occurred: {error}
          </div>
        )}

        {/* Loading State */}
        {(isLoading || isUsersLoading) && (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                <p className="text-gray-600">Searching for users...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Results State */}
        {hasSearched &&
          !isLoading &&
          !isUsersLoading &&
          !error &&
          searchResults &&
          searchResults.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-3">
                  <User className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    No Users Found
                  </h3>
                  <p className="text-gray-600">
                    No users found with email containing &quot;{searchEmail}
                    &quot;
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

        {/* Results Table */}
        {searchResults && searchResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                {searchResults.length} user(s) found matching your search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Reg Number</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Phone Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.regNo}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                          {user.course}
                        </span>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
